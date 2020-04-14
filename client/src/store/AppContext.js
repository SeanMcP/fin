import React from 'react'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export const APP_ACTIONS = {
    LOGIN: 'LOGIN',
    LOG_OUT: 'LOG_OUT'
}

function reducer(state, { payload, type }) {
    switch (type) {
        case 'LOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user
            }
        }
        case APP_ACTIONS.LOG_OUT: {
            return initialState
        }
        default: {
            return state
        }
    }
}

const AppContext = React.createContext(initialState)

export const AppContextProvider = ({ children }) => {
    return <AppContext.Provider value={React.useReducer(reducer, initialState)}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const context = React.useContext(AppContext)

    if (!context) throw new Error('There is no `AppContext` available. Did you call `useAppContext` outside of `AppContextProvider`?')

    return context
}
