import socketIOClient from "socket.io-client";


const ENDPOINT = 'http://localhost:9090'

class SocketController {
    
    socket = null

    init() {
        this.socket = socketIOClient(ENDPOINT)
        return this.socket
    }

    delete() {
        this.socket && this.socket.emit('disconnect')
        this.socket = null
    }
}

export default SocketController