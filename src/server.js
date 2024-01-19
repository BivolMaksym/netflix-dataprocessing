const express = require('express');
const bodyParser = require('body-parser');
const AuthRoutes = require('./routes/auth.routes');
// <<<<<<< alikhan
// const MovieRoutes = require('./routes/movie.routes');
// const SeriesRoutes = require('./routes/series.routes');
// =======
// const watchlistRoutes = require('./routes/watchlistRoutes');
// const watchlistMovieRoutes = require('./routes/watchlistMovieRoutes');
// const watchlistSeriesRoutes = require('./routes/watchlistSeriesRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');
// >>>>>>> main

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
// <<<<<<< alikhan
//         this.server.use('/movie', MovieRoutes);
//         this.server.use('/series', SeriesRoutes);
        
// =======
//         this.server.use('/subscriptions', subscriptionRoutes);
//         this.server.use('/watchlist', watchlistRoutes);
//         this.server.use('/watchlistMovie', watchlistMovieRoutes);
//         this.server.use('/watchlistSeries', watchlistSeriesRoutes);
// >>>>>>> main
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        });
    }
}

const server = new Server();
server.start();