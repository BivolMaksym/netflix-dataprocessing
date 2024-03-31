const MovieService = require('../services/MovieService');
const response = require("../utils/responses.js");
const validator = require("../utils/validators.js");

class Movie {
    constructor() {
        this.movieService = new MovieService();
    }

    addMovie = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const newMovie = req.body;
        console.log("newmovie:", newMovie);
        
        try {
            // Data validation
            if(!newMovie.MovieTitle || !newMovie.ClassificationID || !newMovie.MovieDescription || !newMovie.ReleaseDate || !newMovie.Genre || !newMovie.AvailableQualities) {
                throw {
                    status: 400,
                    message: "Error occured adding movie, you are missing information",
                  };
            }
            
            validator.validateInt(newMovie.ClassificationID, "ClassificationID");

            const movie = await this.movieService.createMovie(newMovie);
            console.log("movie:", movie);

            const message = "Movie added successfully";
            response.statusCode201(receivedAcceptType, message, res);
        }  catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error adding new admin: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    removeMovie = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const movieID = parseInt(req.params.movieID, 10);

        console.log("movieID: ", movieID);

        try {
            const deletedMovie = await this.movieService.removeMovie(movieID);
            console.log("deletedMovie: ", deletedMovie);
            if (!deletedMovie) {
                const message = "Movie not found";
                response.statusCode404(receivedAcceptType, message, res);
            } else {
                const message = "Movie deleted successfully";
                response.statusCode204(receivedAcceptType, message, res);
            }

        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error deleting movie: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    getAllMovies = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        
        
        
        try {
            const movies = await this.movieService.getAllMovies();
            console.log("movies:", movies);
        if (movies) {
            const message = "List of movies retrieved successfully";
            response.statusCode200(receivedAcceptType, message, res, movies);
        } else {
            const message = "Error occured when you tried to retrieve the list of movies";
            response.statusCode404(receivedAcceptType, message, res);
        }
        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error retrieving movies: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    getMovieByItsID = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const movieID = parseInt(req.params.movieID, 10);
        try {
            
            const movie = await this.movieService.getMovieByItsID(movieID);
            if (movie[0] === 0) {
                const message = "Movie with provided id is successfully retrieved.";
                response.statusCode200(receivedAcceptType, message, res, movie);
            } else {
                const message = "Movie with such id is not found.";
                response.statusCode404(receivedAcceptType, message, res);
            }
        }  catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error retrieving movie with provided id: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    updateMovie = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const movieID = parseInt(req.params.movieID);
        
        const updatedMovie = req.body;

        try {
            
            const result = await this.movieService.updateMovie(movieID, updatedMovie);
            console.log("result:", result);
            if (!result) {
                const message = "Movie updated successfully";
                response.statusCode200(receivedAcceptType, message, res);
            } else {
                const message = "Movie with such id is not found";
                response.statusCode404(receivedAcceptType, message, res);
            }
            
        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error updating movie with provided id: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    }


}

module.exports = Movie;



