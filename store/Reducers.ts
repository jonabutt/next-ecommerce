import ActionKind ,{Action} from './Actions'

export type ContextProps = {
    isLoading: boolean,
    auth: string
}

const reducers = (state:ContextProps,action:Action):ContextProps=>{
    switch(action.type){
        case ActionKind.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ActionKind.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

export default reducers;