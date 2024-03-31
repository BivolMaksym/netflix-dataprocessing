const SeriesService = require('../services/SeriesService');
const response = require("../utils/responses.js");
const validator = require("../utils/validators.js");

class Series {
    constructor() {
        this.seriesService = new SeriesService();
    }

    addSeries = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const newSeries = req.body;
        console.log("newSeries:", newSeries);
        
        try {
            // Data validation
            if(!newSeries.SeriesTitle || !newSeries.SeriesDescription || !newSeries.ReleaseDate || !newSeries.Genre || !newSeries.AvailableQualities) {
                throw {
                    status: 400,
                    message: "Error occured adding series, you are missing information",
                  };
            }

            const series = await this.seriesService.addSeries(newSeries);
            console.log("series: ", series);

            const message = "Series added successfully";
            response.statusCode201(receivedAcceptType, message, res);
        }  catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error adding new series: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    removeSeries = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const seriesID = parseInt(req.params.seriesID, 10);

        console.log("seriesID: ", seriesID);

        try {
            const deletedSeries = await this.seriesService.removeSeries(seriesID);
            console.log("deletedSeries: ", deletedSeries);
            if (!deletedSeries) {
                const message = "Series not found";
                response.statusCode404(receivedAcceptType, message, res);
            } else {
                const message = "Series deleted successfully";
                response.statusCode204(receivedAcceptType, message, res);
            }

        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error deleting Series: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    getAllSeries = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        
        
        
        try {
            const series = await this.seriesService.getAllSeries();
            console.log("series:", series);
        if (series) {
            const message = "List of series retrieved successfully";
            response.statusCode200(receivedAcceptType, message, res, series);
        } else {
            const message = "Error occured when you tried to retrieve the list of series";
            response.statusCode404(receivedAcceptType, message, res);
        }
        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error retrieving series: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    getSerieByItsID = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const seriesID = parseInt(req.params.seriesID, 10);
        try {
            
            const series = await this.seriesService.getSerieByItsID(seriesID);
            if (series[0] === 0) {
                const message = "Series with provided id is successfully retrieved.";
                response.statusCode200(receivedAcceptType, message, res, movie);
            } else {
                const message = "Series with such id is not found.";
                response.statusCode404(receivedAcceptType, message, res);
            }
        }  catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error retrieving series with provided id: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    };

    updateSeries = async (req, res) => {
        const receivedAcceptType = req.headers.accept;
        const seriesID = parseInt(req.params.seriesID);
        
        const updatedSeries = req.body;

        try {
            
            const result = await this.seriesService.updateSeries(seriesID, updatedSeries);
            console.log("result:", result);
            if (!result) {
                const message = "Series updated successfully";
                response.statusCode200(receivedAcceptType, message, res);
            } else {
                const message = "Series with such id is not found";
                response.statusCode404(receivedAcceptType, message, res);
            }
            
        } catch (error) {
            if(error.status === 400 && error.message){

                response.statusCode400(receivedAcceptType, error.message, res);
            }else{
                console.log('Error updating series with provided id: ', error);
                const message = 'Internal server error';
                response.statusCode500(receivedAcceptType, message, res);   
            }
        }
    }


}

module.exports = Series;



