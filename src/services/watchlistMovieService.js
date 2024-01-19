const WatchlistMovie = require('../models/watchlistMovie.model');
const DB = require('../config/db.config');

class WatchlistMovieService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlistMovies() {
        const results = await this.db.query('SELECT * FROM WatchlistMovie');
        return results.map((result) => new WatchlistMovie(result.WatchlistID, result.MovieID));
    }

    async getWatchlistMovieByID(watchlistMovieID) {
        const result = await this.db.query('SELECT * FROM WatchlistMovie WHERE WatchlistMovieID = ?', [watchlistMovieID]);
        return result.length === 1 ? new WatchlistMovie(result[0].WatchlistID, result[0].MovieID) : null;
    }

    async createWatchlistMovie(watchlistID, movieID) {
        await this.db.query('INSERT INTO WatchlistMovie (WatchlistID, MovieID) VALUES (?, ?)', [watchlistID, movieID]);
    }

    async deleteWatchlistMovie(watchlistMovieID) {
        await this.db.query('DELETE FROM WatchlistMovie WHERE MovieID = ?', [watchlistMovieID]);
    }
}

module.exports = WatchlistMovieService;
