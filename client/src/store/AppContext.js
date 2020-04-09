import React from 'react'

const initialState = {
    user: {}
}

const AppContext = React.createContext(initialState)

export const AppContextProvider = ({ children }) => {
    const state = React.useState(initialState)
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const context = React.useContext(AppContext)

    if (!context) throw new Error('There is no `AppContext` available. Did you call `useAppContext` outside of `AppContextProvider`?')

    return context
}
