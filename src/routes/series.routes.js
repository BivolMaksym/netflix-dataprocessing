module.exports = app => {
    const series = require(".../controllers/series.controller.js");

    // Add new series 
    app.post("/series", series.create);

    // Update the list of the series
    app.put("/series/:seriesId", series.update)

    // Retrieve all series
    app.get("/series", series.getAll);

    // Retrieve series by its ID
    app.get("/series/:seriesId", series.getSpecific);

    // Remove all series
    app.delete("/series", series.deleteAll);
    
    // Remove a specific series by its ID
    app.delete("/series/:seriesId", series.delete);
};