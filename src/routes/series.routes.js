const express = require('express');
const Series = require("../controller/series.controller.js");

const router = express.Router();
const series = new Series();

// Add new serie
router.post("/:seriesID", series.createSeries);

// Remove a serie
router.delete("/:seriesID", series.removeSeries);

// Retrieve all series
router.get("/", series.getAllSeries);

//Retrieve a serie with certain ID 
router.get("/:seriesID", series.getSerieByItsID);

//Update serie using its ID
router.put("/:seriesID", series.updateSeries);

module.exports = router;

