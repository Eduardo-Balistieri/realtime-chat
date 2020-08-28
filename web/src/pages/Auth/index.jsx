import React, { useState } from 'react'
import { GiAlgae } from 'react-icons/gi'

import styles from './styles.module.css'
import { useAuth } from '../../contexts/Auth'


const Auth = () => {

    const [isInvalid, setIsInvalid] = useState(false)
    const [username, setUsername] = useState('')

    const { signIn } = useAuth()


    const tryToConnect = () => {
        if (!username.trim() || username.length > 15)
            return setIsInvalid(true)

        const error = signIn(username)

        if (error)
            setIsInvalid(true)
    }

    return (
        <main className={styles.authPage}>

            <section className={styles.logo}>
                <GiAlgae />
                <h2>Chat app with Socket.io and React</h2>
            </section>

            <input
                className={isInvalid ? styles.invalidInput : null}
                type="text"
                name="username"
                placeholder="Your username"
                autoComplete="off"

                value={username}
                onChange={({ target }) => setUsername(target.value)}
                onKeyPress={({ charCode }) => charCode === 13 && tryToConnect()}
            />

            <button onClick={tryToConnect} className={styles.connectButton}>Connect</button>
        </main>
    )
}

export default Auth