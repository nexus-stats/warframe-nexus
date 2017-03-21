/**
 * Socket requirements
 */
const io = require('Socket.io')()
const port = process.env.api_port


/**
 * Local Controllers
 */
const requestController = new(require('../../controllers/requestController.js'))


/**
 * Set up Authentication requirements
 */
const auth = require('../../config/auth.js')


/**
 * Initializes socket server and handles socket requests
 */
class SocketAdapter {

    /**
     * Constructs Socket
     * @param {server} server   HTTP Server to bind to
     */
    constructor(server) {

        /**
         * Listen on server
         */
        this.io = io.listen(server)
            //this.io.use(iowildcard)

        /**
         * Config JWT Auth
         */
        auth.configSockets(this.io)

        /**
         * Config Events to listen to
         */
        this.configEvents()
    }


    /**
     * Listens to incoming events
     */
    configEvents() {
        require('../../config/events.js')(this)
    }


    /**
     * Sends requests from requestController to local nodes
     * Returns response from node
     * MAYBE NEED TO SPECIFY RETURN BOOL?
     */
    local(target, model, method, attributes) {
        target.emit('req', {
            method: method,
            attributes: attributes,
            model: model
        })
    }


    /**
     * Handles requests to local nodes
     */
    pass(socket, method, request, ack) {

        // Do Error Handling here due to socket.io middleware restrictions
        // Check if token expired
        if (new Date().getTime() / 1000 - socket.user.exp > 0) {
            cli.log(process.env.api_id, 'warn', cli.getPrefix('Sockets', cli.service_max) + socket.user.uid + ' ' + "TokenExpiredError", 'out')
            ack({
                statusCode: 500,
                body: "TokenExpiredError"
            })
        }

        // Normal response
        else {

            // Assign values to request
            var request = {
                user: socket.user,
                method: method,
                resource: request.resource,
                query: request.query,
                params: request.params,
                channel: 'Sockets' // only relevant for logging
            }

            cli.logRequest(process.env.api_id, request)

            // Send Request to Controller
            var response = requestController.getResponse(request)

            // Send Response back to requesting Socket
            ack(response)

            // Log Output
            response.channel = 'Sockets' // only relevant for logging
            cli.logRequestEnd(process.env.api_id, response)
        }
    }


    /**
     * When local node has new data: update for everyone in relevant rooms
     */
    update(data) {
        this.io.in(data.room).emit(data.event, data.body)
    }


    matchSocketID(identifier) {
        return target
    }

    /** Debug **/
    getClients() {
        cli.log(process.env.api_id, 'neutral', 'Sockets  | ' + 'Clients connected: ' + this.io.sockets.clients.length, false)
    }
}

module.exports = SocketAdapter