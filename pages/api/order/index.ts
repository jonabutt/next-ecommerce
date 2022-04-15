import { Order, OrderDetail, PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CartItemType } from '../../../interfaces';
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from '../../../middleware/auth';

const prisma = new PrismaClient();

type SuccessResponseData = {
    success: boolean,
    msg: string,
    orderAdded: Order | null
}
type GetOrdersSuccessResponseData = {
    success: boolean,
    orders: Order[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessResponseData | GetOrdersSuccessResponseData>
) {

    switch (req.method) {
        case "POST":
            await createOrder(req, res)
            break;
        case "GET":
            await getOrder(req, res)
            break;
    }
}

const getOrder = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | GetOrdersSuccessResponseData>) => {
    try {
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        // get orders
        let orders: Order[] = [];
        if (result.isRoot === true) {
            // if it root get all orders
            orders = await prisma.order.findMany({
                include: {
                    orderDetails: {
                        include: {
                            Product: true
                        }
                    },
                    User: {
                        select: {
                            name: true,
                            email: true,
                            roleId: true,
                        }
                    }
                }
            });
        }
        else {
            // if not root get only user orders
            orders = await prisma.order.findMany({
                where: {
                    userId: result.id
                },
                include: {
                    orderDetails: {
                        include: {
                            Product: true
                        }
                    },
                    User: {
                        select: {
                            name: true,
                            email: true,
                            roleId: true,
                        }
                    }
                }
            });
        }
        // return orders
        res.json({
            success: true,
            orders: orders
        });

    } catch (err) {
        // show error message if there is an error
        if (typeof err === "string") {
            return res.status(500).json({ success: false, msg: err });
        } else if (err instanceof Error) {
            return res.status(500).json({ success: false, msg: (err as Error).message });
        }
    }
}

const createOrder = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessResponseData>) => {
    try {
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        // get cart and total from request
        const { cart, total }: { cart: CartItemType[]; total: Number } = req.body
        // update product sold counter in database     
        const updateProductsPromises = cart.map(c =>
            prisma.product.update({
                where: {
                    id: c.productId
                },
                data: {
                    soldCount: {
                        increment: c.quantity
                    }
                }
            })
        );
        // create order and order details in database
        const createOrderPromise = prisma.order.create({
            data: {
                userId: result.id,
                total: total.toString(),
                orderDetails: {
                    create: cart.map(c => {
                        const orderDetail = {
                            productId: c.productId,
                            quantity: c.quantity as unknown as Decimal,
                            unitPrice: c.price
                        };
                        return orderDetail;
                    })
                }
            }
        });
        // update and insert using transaction
        await prisma.$transaction([...updateProductsPromises, createOrderPromise]);
        const orderId = (await createOrderPromise).id;
        const order: Order | null = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                orderDetails: {
                    include: {
                        Product: true
                    }
                },
                User: {
                    select: {
                        name: true,
                        email: true,
                        roleId: true,
                    }
                }
            }
        });
        // return created order id and success message
        res.json({
            success: true,
            msg: 'Order success! We will contact you to confirm the order.',
            orderAdded: order
        })

    } catch (err) {
        // show error message if there is an error
        if (typeof err === "string") {
            return res.status(500).json({ success: false, msg: err });
        } else if (err instanceof Error) {
            return res.status(500).json({ success: false, msg: (err as Error).message });
        }
    }
}