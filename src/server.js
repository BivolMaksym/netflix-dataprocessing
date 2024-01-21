const express = require('express');
const bodyParser = require('body-parser');
const AuthRoutes = require('./routes/auth.routes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const watchlistMovieRoutes = require('./routes/watchlistMovieRoutes');
const watchlistSeriesRoutes = require('./routes/watchlistSeriesRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const profileRoutes = require('./routes/profileRoutes');

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
        this.server.use('/subscriptions', subscriptionRoutes);
        this.server.use('/watchlist', watchlistRoutes);
        this.server.use('/watchlistMovie', watchlistMovieRoutes);
        this.server.use('/watchlistSeries', watchlistSeriesRoutes);
        this.server.use('/profile', profileRoutes);
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        });
    }
}

const server = new Server();
server.start();