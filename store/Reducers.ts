import { PayloadAuth, CartItemType } from '../interfaces'
import { Action, ActionKind } from './Actions'

export type ContextProps = {
    isLoading: boolean,
    auth: PayloadAuth | null,
    cart: CartItemType[]
}

const reducers = (state:ContextProps,action:Action):ContextProps=>{
    switch(action.type){
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
        default:
            return state;
    }
}

export default reducers;