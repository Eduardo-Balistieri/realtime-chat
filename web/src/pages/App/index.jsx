import React, { useState, useEffect, useRef } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import styles from './styles.module.css'
import { useAuth } from '../../contexts/Auth'


const App = () => {

    const messagesElement = useRef(null)
    const { socket, username, previousMessages, signOut } = useAuth()

    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        setMessages(previousMessages)
    }, [previousMessages])


    useEffect(() => {
        socket.on('receivedMessage', message => {
            setMessages([...messages, message])
        })
        
        const scrollingElement = messagesElement.current
        scrollingElement.scrollTop = scrollingElement.scrollHeight
        
    }, [socket, messages, messagesElement])
    

    useEffect(() => {
        return () => signOut()
    }, [signOut])


    const sendMessage = () => {
        if (!currentMessage.trim())
            return

        const messageObj = { author: username, message: currentMessage }
        socket.emit('sendMessage', messageObj)

        setCurrentMessage('')
        setMessages([...messages, messageObj])
    }

    return (
        <main className={styles.pageWrapper}>

            <section className={styles.chatContainer}>

                <div className={styles.messages} ref={messagesElement}>
                    {messages.map((message, index) => (
                        <div key={index} className={message.author === username ? styles.myMessage : styles.othersMessage}>
                            <span className={styles.author}>{message.author} •</span>
                            <span className={styles.message}>{message.message}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.sendWrapper}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            name="message"
                            placeholder="Type a message here..."
                            autoComplete="off"

                            value={currentMessage}
                            onChange={({ target }) => setCurrentMessage(target.value)}
                            onKeyPress={({ charCode }) => charCode === 13 && sendMessage()}
                        />
                        <button className={styles.sendButton} onClick={sendMessage}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default App