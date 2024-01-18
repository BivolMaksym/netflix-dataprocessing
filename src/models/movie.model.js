class Movie {
    constructor(movieID, classificationID, movieTitle, movieDescription, amountOfViews, releaseDate, genre, availableQualities) {
         this.movieID = movieID;
         this.classificationID = classificationID;
         this.movieTitle = movieTitle;
         this.movieDescription = movieDescription;
         this.amountOfViews = amountOfViews;
         this.releaseDate = releaseDate;
         this.genre = genre;
         this.availableQualities = availableQualities;
    }
}

module.exports = Movie;