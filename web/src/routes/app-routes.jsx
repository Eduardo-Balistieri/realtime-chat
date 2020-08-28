import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import App from '../pages/App'

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRoutes