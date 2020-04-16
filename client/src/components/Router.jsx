import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Class from '../screens/Class'
import Dashboard from '../screens/Dashboard'
import Home from '../screens/Home'
import PrivateRoute from './PrivateRoute'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <PrivateRoute exact path="/class/:id">
                    <Class />
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router