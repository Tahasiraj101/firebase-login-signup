import React, { createContext, useReducer } from 'react';
import { reducer } from './Reducer';

// Create GlobalContext
export const GlobalContext = createContext(null);

const initialState = {
    user: {},
    isLogin: null,
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
