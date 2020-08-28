import React from 'react'

import AuthRoutes from './auth-routes'
import AppRoutes from './app-routes'

import { useAuth } from '../contexts/Auth'


const Routes = () => {
    const { isSignIn } = useAuth()

    return isSignIn ? <AppRoutes /> : <AuthRoutes />
}

export default Routes