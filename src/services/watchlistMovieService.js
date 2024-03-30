const WatchlistMovie = require('../models/watchlistMovie.model');
const DB = require('../config/db.config');

class WatchlistMovieService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlistMovies() {
        const results = await this.db.query('CALL get_all_watchlist_movies()');
        return results.map((result) => new WatchlistMovie(result.WatchlistID, result.MovieID));
    }

    async getWatchlistMovieByID(watchlistMovieID) {
        const result = await this.db.query('CALL get_watchlist_movie_by_id(?)', [watchlistMovieID]);
        return result.length === 1 ? new WatchlistMovie(result[0].WatchlistID, result[0].MovieID) : null;
    }

    async createWatchlistMovie(watchlistID, movieID) {
        await this.db.query('CALL create_watchlist_movie(?, ?)', [watchlistID, movieID]);
    }

    async deleteWatchlistMovie(watchlistMovieID) {
        await this.db.query('CALL delete_watchlist_movie(?)', [watchlistMovieID]);
    }
}

module.exports = WatchlistMovieService;
