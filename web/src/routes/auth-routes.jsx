import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Auth from '../pages/Auth'

const AuthRoutes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Auth} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    )
}

export default AuthRoutes