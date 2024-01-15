const mysql = require("./db.js");

const movie = function (movie){
    this.movie_id = movie.movie_id;
    this.movie_title = movie.movie_title;
    this.movie_description = movie.movie_description;
    this.movie_quality = movie.movie_quality;
    this.movie_releaseDate = movie.movie_releaseDate;
    this.movie_genre = movie.movie_genre;
    this.movie_availability = movie.movie_availability;
    this.movie_classification = movie.movie_classification;
};

movie.add = (newMovie, result) => {
    sql.query("INSERT INTO movie SET ?", newMovie, (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("Added new movie: ", {id: response.insertID, ...newMovie});
        result(null, {id: response.insertID, ...newMovie});
    });
};

movie.updateByID = (id, movie, result) => {
    sql.query("UPDATE movie SET movie_id = ? WHERE id =?", [movie.movie_id, id], (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if(response.list == 0) {
            result({type: "not_found"}, null);
            return;
        }

        console.log("Updated version of movies: ", {id: id, ...movie});
        result(null, {id: id, ...movie});
    });
};

movie.getAll = result => {
    sql.query("SELECT * FROM movie", (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("All movies: ", response);
        result(null, response);
    });
};

movie.getByID = (movieID, result) => {
    sql.query(`SELECT * FROM movie WHERE id = ${movieID}`, (error, response) => {
        if(error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if(response.length) {
            console.log("Found movies regarding your request: ", response[0]);
            result(null, response[0]);
            return;
        }

        result({type: "not_found"}, null);
    });
};

movie.remove = (id, result) => {
    sql.query("DELETE FROM movie WHERE id = ?", id, (error, response) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if (response.list == 0) {
            result({type: "not_found"}, null);
            return;
        }

        console.log("Deleted list of movies with id: ", id);
        result(null, response);
    });
};

movie.removeAll = result => {
    sql.query("DELETE FROM movie", (error, response) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log(`Deleted ${response.list} movie lists.`);
        result(null, response);
    });
};

module.exports = movie;

