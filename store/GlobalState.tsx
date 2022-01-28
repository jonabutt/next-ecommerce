import { createContext , useReducer } from 'react';
import reducers,{ContextProps} from './Reducers'

interface Props {
    children: React.ReactNode
}

const initialState = { 
    isLoading: false,
    auth: ''
}

const DataContext  = createContext<{
    state: ContextProps;
    dispatch: React.Dispatch<any>;
  }>( 
      {
        state: initialState,
        dispatch: () => null
      }
);

const DataProvider:React.FC<Props> = ({children}) => {
    // passing the reducers and initial state
    const [state, dispatch] = useReducer(reducers,initialState)
    return <DataContext.Provider value={{state, dispatch}}>
        {children}
    </DataContext.Provider>
}

export { DataContext, DataProvider };
