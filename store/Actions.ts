enum ActionKind {
    SET_LOADING = 'SET_LOADING',
    AUTH= 'AUTH'
}

export type Action = {
    type: ActionKind,
    payload: string
}
|
{
    type: ActionKind,
    payload: boolean
}

  
export default ActionKind;