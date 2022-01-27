enum ActionKind {
    NOTIFY= 'NOTIFY',
    AUTH= 'AUTH'
}

export type Action = {
    type: ActionKind,
    payload: string
}
  
export default ActionKind;