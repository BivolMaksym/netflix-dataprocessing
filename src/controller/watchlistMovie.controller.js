const WatchlistMovieService = require('../services/watchlistMovieService');

class WatchlistMovieController {
    constructor() {
        this.watchlistMovieService = new WatchlistMovieService();
    }

    getAllWatchlistMovies = async (req, res) => {
        try {
            const watchlistMovies = await this.watchlistMovieService.getAllWatchlistMovies();
            res.json(watchlistMovies);
        } catch (error) {
            console.error('Error fetching watchlist movies: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    getWatchlistMovieByID = async (req, res) => {
        const watchlistMovieID = req.params.id;
        try {
            const watchlistMovie = await this.watchlistMovieService.getWatchlistMovieByID(watchlistMovieID);
            if (watchlistMovie) {
                res.json(watchlistMovie);
            } else {
                res.status(404).send('Watchlist movie not found');
            }
        } catch (error) {
            console.error('Error fetching watchlist movie: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    createWatchlistMovie = async (req, res) => {
        const { watchlistID, movieID } = req.body;
        try {
            await this.watchlistMovieService.createWatchlistMovie(watchlistID, movieID);
            res.status(201).send('Watchlist movie created successfully!');
        } catch (error) {
            console.error('Error creating watchlist movie: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    deleteWatchlistMovie = async (req, res) => {
        const watchlistMovieID = req.params.id;
        try {
            await this.watchlistMovieService.deleteWatchlistMovie(watchlistMovieID);
            res.status(200).send('Watchlist movie deleted successfully!');
        } catch (error) {
            console.error('Error deleting watchlist movie: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = WatchlistMovieController;
