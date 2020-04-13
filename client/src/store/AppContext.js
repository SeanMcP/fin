import React from 'react'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export const APP_ACTIONS = {
    LOGIN: 'LOGIN'
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
