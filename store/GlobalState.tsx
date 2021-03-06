import { createContext, useEffect, useReducer } from 'react';
import { getData } from '../utils/fetchAPI';
import { ActionKind } from './Actions';
import reducers, { ContextProps } from './Reducers';
import { CartItemType, CategoryDTO, OrderDTO, UserDTO } from '../interfaces';

interface Props {
    children: React.ReactNode
}

const initialState = {
    isLoading: false,
    auth: null,
    orders: [] as OrderDTO[],
    cart: [] as CartItemType[],
    users: [] as UserDTO[],
    categories: [] as CategoryDTO[],
}

const DataContext = createContext<{
    state: ContextProps;
    dispatch: React.Dispatch<any>;
}>(
    {
        state: initialState,
        dispatch: () => null
    }
);

const DataProvider: React.FC<Props> = ({ children }) => {
    // passing the reducers and initial state
    const [state, dispatch] = useReducer(reducers, initialState);
    const { cart, auth } = state;
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin === "true") {
            getData('auth/accessToken', '').then(res => {
                if (res.success === false) {
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
        getData("categories")
            .then(res => {
                if (res.success) {
                    dispatch({ type: ActionKind.ADD_CATEGORIES, payload: res.categories });
                }
            })
    }, []);

    useEffect(() => {
        var localStorageCart = localStorage.getItem('__jbecommerce__cart');
        if (localStorageCart !== null) {
            const __jbecommerce__cart = JSON.parse(localStorageCart as string) as CartItemType[];
            dispatch({ type: ActionKind.ADD_CART, payload: __jbecommerce__cart });
        }
    }, []);

    // on change cart set local storage
    useEffect(() => {
        localStorage.setItem('__jbecommerce__cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        // check if user logged in
        if (auth !== null) {

            // get orders depending on the user
            getData('order', auth.token)
                .then(res => {
                    if (res.success === true) {
                        dispatch({ type: ActionKind.ADD_ORDERS, payload: res.orders });
                    }
                });
            // check if the role of the user is admin
            if (auth.user.roleId === 'ckzqt1gxo0081psu7ap73rabs') {
                getData('user', auth.token)
                    .then(res => {
                        if (res.success === true) {
                            dispatch({ type: ActionKind.ADD_USERS, payload: res.users });
                        }
                    });
            }
        }
        else {
            dispatch({ type: ActionKind.ADD_ORDERS, payload: [] });
            dispatch({ type: ActionKind.ADD_USERS, payload: [] });
        }
    }, [auth]);

    return <DataContext.Provider value={{ state, dispatch }}>
        {children}
    </DataContext.Provider>
}

export { DataContext, DataProvider };
