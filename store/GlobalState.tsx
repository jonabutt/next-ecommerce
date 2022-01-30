import { createContext , useEffect, useReducer } from 'react';
import { getData } from '../utils/fetchAPI';
import ActionKind from './Actions';
import reducers,{ContextProps} from './Reducers'

interface Props {
    children: React.ReactNode
}

const initialState = { 
    isLoading: false,
    auth: null
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

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin==="true"){
            getData('auth/accessToken','').then(res => {
                if(res.success===false) {
                    return localStorage.removeItem("firstLogin")
                }
                dispatch({ 
                    type: ActionKind.AUTH,
                    payload: {
                        token: res.accessToken,
                        user: res.user
                    }
                })
            })
        }
        
    },[])

    return <DataContext.Provider value={{state, dispatch}}>
        {children}
    </DataContext.Provider>
}

export { DataContext, DataProvider };