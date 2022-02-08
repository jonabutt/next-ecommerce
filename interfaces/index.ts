// used for user data in the client side
export type User = {
    name: string
    email: string
    roleId: string
    isRoot: boolean
}

// used for payload auth in the react global store
export type PayloadAuth = {
    token: string
    user: User
}

// the jwt data
export type JwtPayload = {
    id: string
}

// used for user data in the client side
export type CartItem = {
    productId: string,
    name: string,
    price: number,
    images: string[],
    quantity: number
}
