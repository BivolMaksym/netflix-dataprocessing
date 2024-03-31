const Series = require('../models/series.model');
const DB = require('../config/db.config');

class SeriesService {
    constructor() {
        this.db = new DB();
    }

    async addSeries(newSeries) {
        await this.db.query('CALL create_series(?, ?, ?, ?, ?, ?, ?)', [ 
            newSeries.SeriesTitle, 
            newSeries.SeriesDescription, 
            newSeries.AmountOfViews, 
            newSeries.AmountOfEpisodes, 
            newSeries.ReleaseDate, 
            newSeries.Genre, 
            newSeries.AvailableQualities
        ]);
    }

    async removeSeries(seriesID) {
        const result = await this.db.query('CALL delete_series(?)', [seriesID]);
        return result;
    }

    async getAllSeries() {
        const results = await this.db.query('CALL get_all_series()');
        return results;
        // .map(result => new Series(result.SeriesID, result.ClassificationID, result.SeriesTitle, result.SeriesDescription, result.AmountOfViews, result.AmountOfEpisodes, result.ReleaseDate, result.Genre, result.AvailableQualities));
    }

    async getSerieByItsID(seriesID) {
        const result = await this.db.query('CALL get_series_by_id(?)', [seriesID]);
        return result;
        // .length === 1 ? new Series(result[0].SeriesID, result[0].ClassificationID, result[0].SeriesTitle, result[0].SeriesDescription, result[0].AmountOfViews, result[0].AmountOfEpisodes, result[0].ReleaseDate, result[0].Genre, result[0].AvailableQualities) : null;
    }

    async updateSeries(seriesID, updatedSeries) {
        const result = await this.db.query('CALL update_series(?, ?, ?, ?, ?, ?, ?, ?)', [
            seriesID, 
            updatedSeries.SeriesTitle, 
            updatedSeries.SeriesDescription, 
            updatedSeries.AmountOfViews, 
            updatedSeries.AmountOfEpisodes, 
            updatedSeries.ReleaseDate, 
            updatedSeries.Genre, 
            updatedSeries.AvailableQualities
        ]);
    }
}

module.exports = SeriesService;
