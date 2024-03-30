const Series = require('../models/series.model');
const DB = require('../config/db.config');

class SeriesService {
    constructor() {
        this.db = new DB();
    }

    async createSeries(newSeries) {
        const { SeriesID, ClassificationID, SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities } = newSeries;
        await this.db.query('CALL create_series(?, ?, ?, ?, ?, ?, ?, ?, ?)', [SeriesID, ClassificationID, SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities]);
    }

    async removeSeries(seriesID) {
        await this.db.query('CALL delete_series(?)', [seriesID]);
    }

    async getAllSeries() {
        const results = await this.db.query('CALL get_all_series()');
        return results.map(result => new Series(result.SeriesID, result.ClassificationID, result.SeriesTitle, result.SeriesDescription, result.AmountOfViews, result.AmountOfEpisodes, result.ReleaseDate, result.Genre, result.AvailableQualities));
    }

    async getSerieByItsID(seriesID) {
        const result = await this.db.query('CALL get_series_by_id(?)', [seriesID]);
        return result.length === 1 ? new Series(result[0].SeriesID, result[0].ClassificationID, result[0].SeriesTitle, result[0].SeriesDescription, result[0].AmountOfViews, result[0].AmountOfEpisodes, result[0].ReleaseDate, result[0].Genre, result[0].AvailableQualities) : null;
    }

    async updateSeries(seriesID, updatedSeries) {
        const { ClassificationID, SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities } = updatedSeries;
        await this.db.query('CALL update_series(?, ?, ?, ?, ?, ?, ?, ?, ?)', [seriesID, ClassificationID, SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities]);
    }
}

module.exports = SeriesService;
