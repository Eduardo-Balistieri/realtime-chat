import React, { createContext, useContext, useState, useCallback } from 'react'

import SocketController from '../socketController'


//*****
const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {

    const [socketController, setSocketController] = useState(null)
    const [username, setUsername] = useState('')
    const [previousMessages, setPreviousMessages] = useState([])


    const signIn = usernameProps => {
        const socketController = new SocketController()
        const socket = socketController.init()

        try {
            socket.on('previousMessages', data => setPreviousMessages(data))
            setUsername(usernameProps)
            setSocketController(socketController)
        }
        catch (error) {
            signOut()
            console.log(error)
            return error
        }
    }

    const signOut = useCallback(() => {
        socketController && socketController.delete()
        setSocketController(null)
        setUsername('')
        setPreviousMessages([])
    }, [socketController])


    return (
        <AuthContext.Provider value={{
            socket: socketController ? socketController.socket : null,
            username,
            previousMessages,
            signIn,
            signOut,
            isSignIn: !!username
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}