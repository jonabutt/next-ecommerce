import { createContext , useEffect, useReducer } from 'react';
import { getData } from '../utils/fetchAPI';
import {ActionKind} from './Actions';
import reducers,{ContextProps} from './Reducers';
import { CartItemType } from '../interfaces';

interface Props {
    children: React.ReactNode
}

const initialState = { 
    isLoading: false,
    auth: null,
    cart: [] as CartItemType[] 
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
    const [state, dispatch] = useReducer(reducers,initialState);
    const { cart } = state;
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
        
    },[]);

    useEffect(() => {
        var localStorageCart = localStorage.getItem('__jbecommerce__cart');
        if(localStorageCart !== null){
            const __jbecommerce__cart = JSON.parse(localStorageCart as string) as CartItemType[];
            dispatch({type: ActionKind.ADD_CART,payload:__jbecommerce__cart});
        }
    },[]);

    // on change cart set local storage
    useEffect(() => {
        localStorage.setItem('__jbecommerce__cart', JSON.stringify(cart));
    },[cart]);


    return <DataContext.Provider value={{state, dispatch}}>
        {children}
    </DataContext.Provider>
}

export { DataContext, DataProvider };
