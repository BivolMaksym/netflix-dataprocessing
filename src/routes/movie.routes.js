module.exports = app => {
    const movie = require(".../controllers/movie.controller.js");

    // Add new movie 
    app.post("/movie", movie.create);

    // Update the list of the movies
    app.put("/movie/:movieId", movie.update)

    // Retrieve all movies
    app.get("/movie", movie.getAll);

    // Retrieve movie by its ID
    app.get("/movie/:movieId", movie.getSpecific);

    // Remove all movies
    app.delete("/movie", movie.deleteAll);
    
    // Remove a specific movie by its ID
    app.delete("/movie/:movieId", movie.delete);
};