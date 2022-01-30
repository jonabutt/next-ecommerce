import { PayloadAuth } from "../interfaces";

enum ActionKind {
    SET_LOADING = 'SET_LOADING',
    AUTH= 'AUTH'
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

  
export default ActionKind;