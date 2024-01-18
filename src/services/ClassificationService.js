const Classification = require('../models/classification.model');
const DB = require('../config/db.config');

class ClassificationService {
    constructor() {
        this.db = new DB();
    }

    async createClassification (classificationID, newClassification) {
        await this.db.query('INSERT INTO Classification ( ClassificationID, InterestedInFilms, InterestedInSeries, PreferedGenres, MinAge, ViewingClassification) VALUES (?, ?, ?, ?, ?, ?)', [newClassification.ClassificationID, newClassification.InterestedInFilms, newClassification.InterestedInSeries, newClassification.PreferedGenres, newClassification.MinAge, newClassification.ViewingClassification]);
    }

    async removeClassification (classificationID) {
        await this.db.query('DELETE FROM Classification WHERE classificationID = ? ', [classificationID]);
    }

    async getAllClassifications () {
        const results = await this.db.query('SELECT * FROM Classification ');
        return results.map((result) => new Classification(result.ClassificationID, result.InterestedInFilms, result.InterestedInSeries, result.PreferedGenres, result.MinAge, result.ViewingClassification));
    }

    async getClassificationByItsID (classificationID) {
        const result = await this.db.query('SELECT * FROM Classification WHERE ClassificationID = ?', [ClassificationID]);
        return result.length === 1 ? new Classification(result[0].ClassificationID, result[0].InterestedInFilms, result[0].InterestedInSeries, result[0].PreferedGenres, result[0].MinAge, result[0].ViewingClassification) : null;
    }

    async updateClassification (classificationID, updatedClassification) {
        await this.db.query('UPDATE Classification SET ClassificationID = ?, ClassificationID = ?, InterestedInFilms = ?, InterestedInSeries = ?, PreferedGenres = ?, MinAge = ?, ViewingClassification = ?', [updatedClassification.ClassificationID, updatedClassification.InterestedInFilms, updatedClassification.InterestedInSeries, updatedClassification.PreferedGenres, updatedClassification.MinAge, updatedClassification.ViewingClassification]);
    }
}

module.exports = ClassificationService;