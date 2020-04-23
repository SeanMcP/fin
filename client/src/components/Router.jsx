import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Class from '../screens/Class'
import Dashboard from '../screens/Dashboard'
import Home from '../screens/Home'
import Students from '../screens/Students'

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
                <PrivateRoute exact path="/students">
                    <Students />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router