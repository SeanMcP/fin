import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../screens/Home'
import Dashboard from '../screens/Dashboard'
import AuthenticatedRoute from './AuthenticatedRoute'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <AuthenticatedRoute exact path="/dashboard">
                    <Dashboard />
                </AuthenticatedRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router