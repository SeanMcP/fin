import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuthCheck from '../hooks/useAuthCheck'

function PrivateRoute({ children, ...props }) {
    const isAuthenticated = useAuthCheck()

    return (
        <Route
            {...props}
            render={({ location }) => {
                switch (isAuthenticated) {
                    case true: {
                        return children
                    }
                    case false: {
                        return <Redirect to={{ pathname: '/', state: { from: location } }} />
                    }
                    default: {
                        return <div>Loading...</div>
                    }
                }
            }}
        />
    )
}

export default PrivateRoute