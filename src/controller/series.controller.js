const SeriesService = require('../services/SeriesService');

class Series {
    constructor() {
        this.seriesService = new SeriesService();
    }

    createSeries = async (req, res) => {
        
        try {
            await this.seriesService.createSeries(seriesID);
            const {seriesID, classificationID, seriesTitle, seriesDescription, amountOfViews, amountOfEpisodes, releaseDate, genre, availableQualities} = req.body;
            
            if(!seriesID || !classificationID || !seriesTitle || !seriesDescription || !amountOfViews || !amountOfEpisodes || !releaseDate || !genre || !availableQualities) {
                return res.status(400).send("Missing information for creating new serie.")
            } 
            res.status(200).send("Serie added successfully")
        }  catch (err) {
            console.err('Error creating a serie:', err);
            res.status(500).send("Internal server error");
        }
        
    };

    removeSeries = async (req, res) => {
        const seriesID = req.body;

        try {
           
            await this.seriesService.removeSeries(seriesID);
            res.json({message: 'Serie deleted successfully'});
        } catch (err) {
            console.error('Error deleting Serie: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getAllSeries = async (req, res) => {
        try {
            const series = await this.seriesService.getAllSeries();
            res.json(series);
        } catch (err) {
            console.error('Error getting all series: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getSerieByItsID = async (req, res) => {
        try {
            const serie = await this.seriesService.getSerieByItsID(seriesID);
            if (serie) {
                res.json(serie);
            } else {
                res.status(401).send('Serie with such ID is not found.')
            }
        }  catch (err) {
            console.error('Error getting serie with such id: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    updateSeries = async (req, res) => {
        const seriesID = parseInt(req.params.seriesID);
        const updatedSeries = req.body;

        try {
            await this.seriesService.updateSeries(seriesID, seriesMovie);
            res.json({message: 'Serie updated successfully'});
        } catch (err) {
            console.error('Error updating serie: ', error.message);
            res.status(500).send('Internal server error');
        }
    }


}

module.exports = Series;



