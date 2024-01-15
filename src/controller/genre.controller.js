const Genres = {
    Documentary: "Documentary",
    Horror: "Horror",
    Sci_fi: "Sci_fi"
}

const genreController = {
    getAllGenres: (request, response) => {
        response.json(Object.values(Genres))
    },

    getGenreById: (request, response) => {
        const genreId = request.params.body;

        if(Genres[genreId]) {
            response.json(Genres[genreId]);
        } else {
            response.status(404).json({error: 'Genre is not found'});
        }
    }
};