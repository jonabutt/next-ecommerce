import { PayloadAuth } from '../interfaces'
import ActionKind ,{Action} from './Actions'

export type ContextProps = {
    isLoading: boolean,
    auth: PayloadAuth | null
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
        default:
            return state;
    }
}

export default reducers;