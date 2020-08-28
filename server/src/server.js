import http from 'http'
import socketio from 'socket.io'



// socket.io
let messages = []

const httpServer = http.createServer()
const io = socketio(httpServer)

io.on('connection', socket => {
    console.log(`New connection: ${socket.id}`)
    
    io.emit('previousMessages', messages)

    socket.on('sendMessage', message => {
        messages.push(message)
        socket.broadcast.emit('receivedMessage', message)
    })

    socket.on('disconnect', () => console.log('disconnect')) 
})

httpServer.listen(9090)