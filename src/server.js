const express = require('express');
const bodyParser = require('body-parser');
const AuthRoutes = require('./routes/auth.routes');

class Server {
    constructor() {
        this.server = express();
        this.port = 3000;
        this.setupMiddleWare();
        this.setupRoutes();
    }

    setupMiddleWare() {
        this.server.use(bodyParser.json());
    }

    setupRoutes() {
        this.server.use('/auth', AuthRoutes);
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        });
    }
}

const server = new Server();
server.start();