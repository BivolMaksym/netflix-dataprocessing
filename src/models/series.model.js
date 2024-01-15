const mysql = require("./db.js");

const series = function (series){
    this.series_id = series.series_id;
    this.series_title = series.series_title;
    this.series_description = series.series_description;
    this.series_quality = series.series_quality;
    this.series_releaseDate = series.series_releaseDate;
    this.series_genre = series.series_genre;
    this.series_availability = series.series_availability;
    this.series_classification = series.series_classification;
    this.series_classification_id = series.series_classification_id;
    this.series_subtitles_language = series.series_subtitles_language;
    this.series_subtitles_mode = series.series_subtitles_mode;
};

series.add = (newSeries, result) => {
    sql.query("INSERT INTO series SET ?", newSeries, (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("Added new series: ", {id: response.insertID, ...newSeries});
        result(null, {id: response.insertID, ...newSeries});
    });
};

series.updateByID = (id, series, result) => {
    sql.query("UPDATE series SET series_id = ? WHERE id =?", [series.series_id, id], (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if(response.list == 0) {
            result({ type: "not_found"}, null);
            return;
        }

        console.log("Updated version of series: ", {id: id, ...series});
        result(null, {id: id, ...series});
    });
};

series.getAll = result => {
    sql.query("SELECT * FROM series", (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("All series: ", response);
        result(null, response);
    });
};

series.getByID = (seriesID, result) => {
    sql.query(`SELECT * FROM series WHERE id = ${seriesID}`, (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if(response.length) {
            console.log("Found series regarding your request: ", response[0]);
            result(null, response[0]);
            return;
        }

        result({type: "not_found"}, null);
    });
};

series.remove = (id, result) => {
    sql.query("DELETE FROM series WHERE id = ?", id, (error, response) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if (response.list == 0) {
            result({type: "not_found"}, null);
            return;
        }

        console.log("Deleted list of series with id: ", id);
        result(null, response);
    });
};

series.removeAll = result => {
    sql.query("DELETE FROM series", (error, response) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log(`Deleted ${response.list} series lists.`);
        result(null, response);
    });
};

module.exports = series;

