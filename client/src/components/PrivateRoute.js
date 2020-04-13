import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAppContext } from '../store/AppContext'

function PrivateRoute({ children, ...props }) {
    const [{ isAuthenticated }] = useAppContext()

    return <Route {...props} render={({ location }) => isAuthenticated ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />} />
}

export default PrivateRoute