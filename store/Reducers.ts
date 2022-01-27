import ActionKind ,{Action} from './Actions'

export type ContextProps = {
    auth: string
}

const reducers = (state:ContextProps,action:Action):ContextProps=>{
    switch(action.type){
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