/**
 * Event Configuration for Socket.io Server
 */
module.exports = (sockets) => {

    sockets.io.on('connection', (socket) => {

        // Log connection
        cli.log(process.env.api_id, 'neutral', 'Sockets  | ' + socket.user.uid + ' connected', 'in')

        // Log disconnect
        socket.on('disconnect', () => cli.log(process.env.api_id, 'neutral', 'Sockets  | ' + socket.user.uid + ' disconnected', 'in'))

        // RESTful-like event types
        socket.on('GET', (request, ack) => sockets.pass(socket, 'GET', request, ack))

        socket.on('POST', (request, ack) => sockets.pass(socket, 'POST', request, ack))

        socket.on('PUT', (request, ack) => sockets.pass(socket, 'PUT', request, ack))

        socket.on('DELETE', (request, ack) => sockets.pass(socket, 'DELETE', request, ack))

        // Private Endpoints, requires authorization
        socket.on('UPDATE', (data, ack) => sockets.update(data, ack))
    })
}