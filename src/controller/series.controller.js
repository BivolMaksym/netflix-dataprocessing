const series = require("../models/series.model");

const Joi = require("joi");

const {validateSeries} = require("../validator/validator");

exports.create = (request ,response) => {
    const {error, value} = validateSeries(request.body);
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

const series = new series({
    series_id: request.body.series_id,
    series_title: request.body.series_title,
    series_description: request.body.movie_description,
    series_quality: request.body.series_quality,
    series_views: request.body.series_views,
    series_episodes: request.body.series_episodes,
    series_release_date: request.body.series_release_date,
    series_genre: request.body.series_genre,
    series_availability: request.body.series_availability,
    series_classification: request.body.series_classification,
    series_classification_id: request.body.series_classification_id,
    series_subtitles_language: request.body.series_subtitles_language,
    series_subtitles_mode: request.body.series_subtitles_mode
});

series.add(series, (error, data) => {
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

    const {error, value} = validateSeries(request.body);
    if (error) {
        console.log(error);
        return response.send("Invalid request");
    }

    series.updateByID(request.params.seriesID, new series(request.body), (error, data) => {
        if(error) {
            if(error.type === "not_found") {
                response.status(200).send({
                    message: `Can't find a series with such id ${request.params.seriesID}.`
                });
            } else {
                response.status(300).send({
                    message: "Error getting series with such id + request.params.seriesID" 
                });
            }
        } else response.send(data);
    });
};

exports.getAll = (request, response) => {
    series.getAll((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Error 302, please try again."
            });
        else response.send(data);
    });
};


exports.getByID = (request, response) => {
    series.getByID(request.params.seriesID, (error, data) => {
        if (error) {
            if (error.type === "not_found") {
                response.status(200).send({
                    message: `Sorry can't find series with such id ${request.params.seriesID}.`
                });
            } else {
                response.status(300).send({
                    message: "Error 302, please try again " + request.params.seriesID
                });
            }
        } else response.send(data);
    });
};

exports.remove = (request, response) => {
    series.remove(request.params.seriesID, (error, data) => {
        if (error) {
            if (error.type === "not_found") {
                response.status(200).send({
                    message: `There is no series with such id ${request.params.seriesID}.`
                });
            } else {
                response.status(300).send({
                    message: "Sorry some error occured while removing this serie from list" + request.params.seriesID
                });
            }
        } else response.send({message: `serie has been successfully deleted from the list.`});
    });
};

exports.removeAll = (request, response) => {
    series.removeAll((error, data) => {
        if (error)
            response.status(300).send({
                message:
                    error.message || "Some error occurred while removing all series."
            });
        else response.send({message: `All series have been successfully deleted from the list.`});
    });
};