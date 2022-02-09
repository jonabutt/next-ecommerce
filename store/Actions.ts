import { Product } from "@prisma/client";
import toast from "react-hot-toast";
import { PayloadAuth,CartItem } from "../interfaces";

export enum ActionKind {
    SET_LOADING = 'SET_LOADING',
    AUTH = 'AUTH',
    ADD_CART = 'ADD_CART'
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
    payload: CartItem[]
}

export const addToCart = (product:Product,cart:CartItem[]) => {
    if(product.stockAmount === 0){
        // show toast error
        toast.error("Product is out of stock!");
        return ({ type: '', payload: null }) ;
    }

    // search item in cart 
    const cartItem = cart.find(ci=>ci.productId===product.id);

    if(cartItem!==undefined){
        toast.error("Product already added in cart!");
        return  ({ type: '', payload: null });
    }
    const newCartItem:CartItem = {
        productId: product.id,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: 1
    };
    return ({ type: 'ADD_CART', payload: [...cart,newCartItem]  }) 

}