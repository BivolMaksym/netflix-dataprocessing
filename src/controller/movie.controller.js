const movie = require("../models/movie.model");

const Joi = require("joi");

const {validateMovie} = require("../validator/validator");

exports.create = (request ,response) => {
    const {error, value} = validateMovie(request.body);
    if (error) {
        console.log(error);
        return response.send("Invalid Request");
    }
}

if (!request.body) {
    response.status(200).send({
        message: "You didn't add anything"
    });
}

const movie = new movie({
    movie_id: request.body.movie_id,
    movie_title: request.body.movie_title,
    movie_description: request.body.movie_description,
    movie_quality: request.body.movie_quality,
    movie_views: request.body.movie_views,
    movie_release_date: request.body.movie_release_date,
    movie_genre: request.body.movie_genre,
    movie_availability: request.body.movie_availability,
    movie_classification: request.body.movie_classification
});

movie.add(movie, (error, data) => {
    if(error)
    response.status(500).send({
        message: 
        error.message || "Error 505, please try again"
    }); 
    else response.send(data);
    });

exports.update = (request, response) => {
    if(!request.body) {
        response.status(200).send({
            message: "You must add content, it can't be empty"
        });
    }

    const {error, value} = validateMovie(request.body);
    if (error) {
        console.log(error);
        return response.send("Invalid request");
    }

    movie.updateByID(request.params.movieID, new movie(request.body), (error, data) => {
        if(error) {
            if(error.type === "not_found") {
                response.status(200).send({
                    message: `Can't find a movie with such id ${request.params.movieID}.`
                });
            } else {
                response.status(300).send({
                    message: "Error getting a movie with such id + request.params.movieID" 
                });
            }
        } else response.send(data);
    });
};

exports.getAll = (request, response) => {
    moviea.getAll((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Error 302, please try again."
            });
        else response.send(data);
    });
};


exports.getByID = (request, response) => {
    movie.getByID(request.params.movieID, (error, data) => {
        if (error) {
            if (error.type === "not_found") {
                response.status(200).send({
                    message: `Sorry can't find movie with such id ${request.params.movieID}.`
                });
            } else {
                response.status(300).send({
                    message: "Error 302, please try again " + request.params.movieID
                });
            }
        } else response.send(data);
    });
};

exports.remove = (request, response) => {
    movie.remove(request.params.movieID, (error, data) => {
        if (error) {
            if (error.type === "not_found") {
                response.status(200).send({
                    message: `There is no film with such id ${request.params.movieID}.`
                });
            } else {
                response.status(300).send({
                    message: "Sorry some error occured while removing this movie from list" + request.params.movieID
                });
            }
        } else response.send({message: `Movie has been successfully deleted from the list.`});
    });
};

exports.removeAll = (request, response) => {
    movie.removeAll((error, data) => {
        if (error)
            response.status(300).send({
                message:
                    error.message || "Some error occurred while removing all movies."
            });
        else response.send({message: `All movies have been successfully deleted from the list.`});
    });
};