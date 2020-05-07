import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../screens/Dashboard'
import Home from '../screens/Home'
import Section from '../screens/Section'
import Students from '../screens/Students'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/section/:id">
          <Section />
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
