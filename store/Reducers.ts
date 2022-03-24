import { PayloadAuth, CartItemType, OrderDTO, UserDTO, CategoryDTO } from '../interfaces'
import { Action, ActionKind } from './Actions'

export type ContextProps = {
    isLoading: boolean,
    auth: PayloadAuth | null,
    orders: OrderDTO[],
    cart: CartItemType[],
    users: UserDTO[],
    categories: CategoryDTO[]
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
                orders: action.payload as Array<OrderDTO>
            };
        case ActionKind.ADD_USERS:
            return {
                ...state,
                users: action.payload as Array<UserDTO>
            };
        case ActionKind.ADD_CATEGORIES:
            return {
                ...state,
                categories: action.payload as Array<CategoryDTO>
            };
        default:
            return state;
    }
}

export default reducers;