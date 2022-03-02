import { Order, OrderDetail, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CartItemType } from '../../../interfaces';
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from '../../../middleware/auth';

const prisma = new PrismaClient();

type SuccessResponseData = {
    success: boolean,
    msg: string,
    orderId: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessResponseData>
) {

    switch (req.method) {
        case "POST":
            await createOrder(req, res)
            break;
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
                total: total,
                orderDetails: {
                    create: cart.map(c => {
                        const orderDetail: OrderDetail = {
                            productId: c.productId,
                            quantity: c.quantity,
                            unitPrice: c.price
                        };
                        return orderDetail;
                    })
                }
            }
        });
        // update and insert using transaction
        await prisma.$transaction([...updateProductsPromises, createOrderPromise]);

        // return created order id and success message
        res.json({
            success: true,
            msg: 'Order success! We will contact you to confirm the order.',
            orderId: (await createOrderPromise).id
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