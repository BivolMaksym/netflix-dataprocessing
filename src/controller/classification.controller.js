const ClassificationService = require('../services/ClassificationService');

class Classification {
    constructor() {
        this.classification = new ClassificationService();
    }

    createClassification = async (req, res) => {
        
        try {
            await this.classificationService.createClassification(classificationID);
            const {classificationId, InterestedInFilms, InterestedInSeries, PreferedGenres, MinAge, ViewingClassification} = req.body;
            
            if(!classificationId || !InterestedInFilms || !InterestedInSeries || !PreferedGenres || !MinAge || !ViewingClassification) {
                return res.status(400).send("Missing information for creating new classification.")
            } 
            res.status(200).send("classification added successfully")
        }  catch (err) {
            console.err('Error creating a classification:', err);
            res.status(500).send("Internal server error");
        }
        
    };

    removeClassification = async (req, res) => {
        const classification = req.body;

        try {
           
            await this.classificationService.removeClassification(classificationID);
            res.json({message: 'classification deleted successfully'});
        } catch (err) {
            console.error('Error deleting classification: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getAllClassifications = async (req, res) => {
        try {
            const classifications = await this.classificationService.getAllClassifications();
            res.json(classifications);
        } catch (err) {
            console.error('Error getting all classifications: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    getClassificationByItsID = async (req, res) => {
        try {
            const classification = await this.classificationService.getClassificationByItsID(classificationID);
            if (classification) {
                res.json(classification);
            } else {
                res.status(401).send('classification with such ID is not found.')
            }
        }  catch (err) {
            console.error('Error getting classification with such id: ', err.message);
            res.status(500).send('Internal server error');
        }
    };

    updateClassification = async (req, res) => {
        const classificationID = parseInt(req.params.classificationID);
        const updatedClassification = req.body;

        try {
            await this.classificationService.updateClassification(classificationID, updatedClassification);
            res.json({message: 'classification updated successfully'});
        } catch (err) {
            console.error('Error updating classification: ', error.message);
            res.status(500).send('Internal server error');
        }
    }


}

module.exports = Movie;



