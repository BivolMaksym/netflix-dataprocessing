const Series = require('../models/series.model');
const DB = require('../config/db.config');

class SeriesService {
    constructor() {
        this.db = new DB();
    }

    async createSeries (seriesID, newSeries) {
        await this.db.query('INSERT INTO Series (SeriesID, ClassificationID, SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [newSeries.seriesID, newSeries.ClassificationID, newSeries.SeriesTitle, newSeries.SeriesDescription, newSeries.AmountOfViews, newSeries.AmountOfEpisodes, newSeries.ReleaseDate, newSeries.Genre, newSeries.AvailableQualities]);
    }

    async removeSeries (seriesID) {
        await this.db.query('DELETE FROM Series WHERE seriesID = ? ', [seriesID]);
    }

    async getAllSeries () {
        const results = await this.db.query('SELECT * FROM Series ');
        return results.map((result) => new Series(result.SeriesID, result.ClassificationID, result.SeriesTitle, result.SeriesDescription, result.AmountOfViews, result.AmountOfEpisodes, result.ReleaseDate, result.Genre, result.AvailableQualities));
    }

    async getSerieByItsID (seriesID) {
        const result = await this.db.query('SELECT * FROM Series WHERE SeriesID = ?', [seriesID]);
        return result.length === 1 ? new Series(result[0].SeriesID, result[0].ClassificationID, result[0].SeriesTitle, result[0].SeriesDescription, result[0].AmountOfViews, result[0].AmountOfEpisodes, result[0].ReleaseDate, result[0].Genre, result[0].AvailableQualities) : null;
    }

    async updateSeries (seriesID, updatedSeries) {
        await this.db.query('UPDATE Series SET SeriesID = ?, ClassificationID = ?, SeriesTitle = ?, SeriesDescription = ?, AmountOfViews = ?, AmountOfEpisodes = ?, ReleaseDate = ?, Genre = ?, AvailableQualities = ?', [updatedSeries.SeriesID, updatedSeries.ClassificationID, updatedSeries.SeriesTitle, updatedSeries.SeriesDescription, updatedSeries.AmountOfViews, updatedSeries.AmountOfEpisodes, updatedSeries.ReleaseDate, updatedSeries.Genre, updatedSeries.availableQualities]);
    }
}

module.exports = SeriesService;