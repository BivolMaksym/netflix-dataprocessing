const MovieService = require('../services/MovieService');

class Movie {
    constructor() {
        this.movieService = new MovieService();
    }

    createMovie = async (req, res) => {
        const newMovie = req.body;
        
        try {
            await this.movieService.createMovie(newMovie);
            const {MovieID, ClassificationID, MovieTitle, MovieDescription, AmountOfViews, ReleaseDate, Genre, AvailableQualities} = req.body;
            
            // if(!MovieID || !ClassificationID || !MovieTitle || !MovieDescription || !AmountOfViews || !ReleaseDate || !Genre || !AvailableQualities) {
            //     return res.status(400).send("Missing information for creating new movie.")
            // } 
            res.status(200).send("Movie added successfully")
        }  catch (err) {
            console.error('Error creating a movie:', err);
            res.status(500).send("Internal server error");
        }
        
    };

    removeMovie = async (req, res) => {
        const movieID = req.body;

        try {
           
            await this.movieService.removeMovie(movieID);
            res.json({message: 'Movie deleted successfully'});
        } catch (err) {
            console.error('Error deleting movie: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getAllMovies = async (req, res) => {
        try {
            const movies = await this.movieService.getAllMovies();
            res.json(movies);
        } catch (err) {
            console.error('Error getting all movies: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getMovieByItsID = async (req, res) => {
        try {
            const movie = await this.movieService.getMovieByItsID(movieID);
            if (movie) {
                res.json(movie);
            } else {
                res.status(401).send('Movie with such ID is not found.')
            }
        }  catch (err) {
            console.error('Error getting movie with such id: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    updateMovie = async (req, res) => {
        const movieID = parseInt(req.params.movieID);
        const updatedMovie = req.body;

        try {
            await this.movieService.updateMovie(movieID, updatedMovie);
            res.json({message: 'Movie updated successfully'});
        } catch (err) {
            console.error('Error updating movie: ', error.message);
            res.status(500).send('Internal server error');
        }
    }


}

module.exports = Movie;



