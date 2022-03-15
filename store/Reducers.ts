import { Order } from '@prisma/client'
import { PayloadAuth, CartItemType } from '../interfaces'
import { Action, ActionKind } from './Actions'

export type ContextProps = {
    isLoading: boolean,
    auth: PayloadAuth | null,
    orders: Order[],
    cart: CartItemType[]
}

const reducers = (state: ContextProps, action: Action): ContextProps => {
    switch (action.type) {
        case ActionKind.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload as boolean
            }
        case ActionKind.AUTH:
            return {
                ...state,
                auth: action.payload as PayloadAuth
            }
        case ActionKind.ADD_CART:
            return {
                ...state,
                cart: action.payload as Array<CartItemType>
            };
        case ActionKind.ADD_ORDERS:
            return {
                ...state,
                orders: action.payload as Array<Order>
            };
        default:
            return state;
    }
}

export default reducers;