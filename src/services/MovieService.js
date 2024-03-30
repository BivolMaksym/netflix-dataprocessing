const Movie = require('../models/movie.model');
const DB = require('../config/db.config');

class MovieService {
    constructor() {
        this.db = new DB();
    }

    async createMovie(newMovie) {
        await this.db.query('CALL create_movie(?, ?, ?, ?, ?, ?, ?, ?)', [
            newMovie.MovieID,
            newMovie.ClassificationID,
            newMovie.MovieTitle,
            newMovie.MovieDescription,
            newMovie.AmountOfViews,
            newMovie.ReleaseDate,
            newMovie.Genre,
            newMovie.AvailableQualities
        ]);
    }

    async removeMovie(movieID) {
        await this.db.query('CALL remove_movie(?)', [movieID]);
    }

    async getAllMovies() {
        const results = await this.db.query('CALL get_all_movies()');
        return results.map((result) => new Movie(result.MovieID, result.ClassificationID, result.MovieTitle, result.MovieDescription, result.AmountOfViews, result.ReleaseDate, result.Genre, result.AvailableQualities));
    }

    async getMovieByItsID(movieID) {
        const result = await this.db.query('CALL get_movie_by_id(?)', [movieID]);
        return result.length === 1 ? new Movie(result[0].MovieID, result[0].ClassificationID, result[0].MovieTitle, result[0].MovieDescription, result[0].AmountOfViews, result[0].ReleaseDate, result[0].Genre, result[0].AvailableQualities) : null;
    }

    async updateMovie(movieID, updatedMovie) {
        await this.db.query('CALL update_movie (?, ?, ?, ?, ?, ?, ?, ?)', [
            updatedMovie.MovieID,
            updatedMovie.ClassificationID,
            updatedMovie.MovieTitle,
            updatedMovie.MovieDescription,
            updatedMovie.AmountOfViews,
            updatedMovie.ReleaseDate,
            updatedMovie.Genre,
            updatedMovie.AvailableQualities
        ]);
    }
}

module.exports = MovieService;
