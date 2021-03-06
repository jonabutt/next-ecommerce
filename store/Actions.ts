import { Order, Product } from "@prisma/client";
import toast from "react-hot-toast";
import { PayloadAuth, CartItemType, UserDTO, CategoryDTO } from "../interfaces";

export enum ActionKind {
    SET_LOADING = 'SET_LOADING',
    AUTH = 'AUTH',
    ADD_CART = 'ADD_CART',
    ADD_ORDERS = 'ADD_ORDERS',
    ADD_USERS = 'ADD_USERS',
    ADD_CATEGORIES = 'ADD_CATEGORIES',
}

export type Action = {
    type: ActionKind,
    payload: PayloadAuth
}
    |
{
    type: ActionKind,
    payload: boolean
}
    |
{
    type: ActionKind,
    payload: CartItemType[]
} |
{
    type: ActionKind,
    payload: Order[]
} |
{
    type: ActionKind,
    payload: UserDTO[]
} |
{
    type: ActionKind,
    payload: CategoryDTO[]
}


export const addToCart = (product: Product, cart: CartItemType[]) => {
    if (product.stockAmount === 0) {
        // show toast error
        toast.error("Product is out of stock!");
        return ({ type: '', payload: null });
    }

    // search item in cart 
    const cartItem = cart.find(ci => ci.productId === product.id);

    if (cartItem !== undefined) {
        toast.error("Product already added in cart!");
        return ({ type: '', payload: null });
    }
    const newCartItem: CartItemType = {
        productId: product.id,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: 1
    };
    return ({ type: ActionKind.ADD_CART, payload: [...cart, newCartItem] });

}

export const increaseQuantityCartItem = (cart: CartItemType[], id: string) => {
    const updatedCart = [...cart];
    let cartItem = updatedCart.find(c => c.productId === id);
    if (cartItem !== null) {
        cartItem = cartItem as CartItemType;
        cartItem.quantity = cartItem.quantity + 1;
    }
    return ({ type: ActionKind.ADD_CART, payload: updatedCart });
}

export const decreaseQuantityCartItem = (cart: CartItemType[], id: string) => {
    const updatedCart = [...cart];
    let cartItem = updatedCart.find(c => c.productId === id);
    if (cartItem !== null) {
        cartItem = cartItem as CartItemType;
        if (cartItem.quantity === 1)
            return ({ type: '', payload: null });
        cartItem.quantity = cartItem.quantity - 1;
    }
    return ({ type: ActionKind.ADD_CART, payload: updatedCart });
}

export const removeCartItem = (cart: CartItemType[], id: string) => {
    const updatedCart = cart.filter(c => c.productId !== id);
    return ({ type: ActionKind.ADD_CART, payload: updatedCart });
}

export const updateUserRole = (users: UserDTO[], userId: string, roleId: string) => {
    const updatedUsers = [...users];
    let userToUpdate = updatedUsers.find(u => u.id === userId);
    if (userToUpdate) {
        userToUpdate.roleId = roleId;
        return ({ type: ActionKind.ADD_USERS, payload: updatedUsers });
    }
}

export const removeUser = (users: UserDTO[], userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    return ({ type: ActionKind.ADD_USERS, payload: updatedUsers });
}

export const removeCategory = (categories: CategoryDTO[], categoryId: string) => {
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    return ({ type: ActionKind.ADD_CATEGORIES, payload: updatedCategories });
}