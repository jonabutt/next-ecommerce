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