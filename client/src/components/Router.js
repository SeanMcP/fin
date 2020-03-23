import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../screens/Home'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router