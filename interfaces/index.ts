import { Prisma } from "@prisma/client"

// used for user data in the client side
export type User = {
    name: string;
    email: string;
    roleId: string;
    isRoot: boolean;
}

// used for payload auth in the react global store
export type PayloadAuth = {
    token: string;
    user: User;
}

// the jwt data
export type JwtPayload = {
    id: string;
}

// used for user data in the client side
export type CartItemType = {
    productId: string;
    name: string;
    price: Prisma.Decimal;
    images: string[];
    quantity: number;
}


export type OrderDTO = {
    id: string;
    dateCreated: Date;
    total: Prisma.Decimal;
    userId: string;
    orderDetails: OrderDetailDTO[];
    User: User;
}

export type OrderDetailDTO = {
    id: string;
    unitPrice: Prisma.Decimal;
    quantity: Prisma.Decimal;
    orderId: string;
    productId: string;
    Product: ProductDTO;
}

export type ProductDTO = {
    id: string;
    name: string;
    price: Prisma.Decimal;
    description: string;
    content: string;
    checked: boolean;
    stockAmount: number;
    soldCount: number;
    images: string[];
    dateCreated: Date;
    categoryId: string;
}