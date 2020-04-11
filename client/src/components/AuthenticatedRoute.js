import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function AuthenticatedRoute(props) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    React.useEffect(() => {
        async function callRefresh() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh`, { credentials: 'include' })
            if (response.ok) {
                setIsAuthenticated(true)
            } else {
                isAuthenticated && setIsAuthenticated(false)
            }
        }
        callRefresh()
    })

    return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />
}

export default AuthenticatedRoute