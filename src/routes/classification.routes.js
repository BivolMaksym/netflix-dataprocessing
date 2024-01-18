const express = require('express');
const Classification = require("../controller/classification.controller.js");

const router = express.Router();
const classification = new Classification();

// Add new classification 
router.post("/:classificationID", classification.createClassification);

// Remove a classification
router.delete("/:classificationID", classification.removeClassification);

// Retrieve all classifications
router.get("/", classification.getAllClassifications);

//Retrieve a classification with certain ID 
router.get("/:classificationID", classification.getClassificationByItsID);

//Update classification using its ID
router.put("/:classificationID", classification.updateClassification);

module.exports = router;

