class Series {
    constructor(seriesID, classificationID, seriesTitle, seriesDescription, amountOfViews, amountOfEpisodes, releaseDate, genre, availableQualities){
        this.seriesID = seriesID;
        this.classificationID = classificationID;
        this.seriesTitle = seriesTitle;
        this.seriesDescription = seriesDescription;
        this.amountOfViews = amountOfViews;
        this.amountOfEpisodes = amountOfEpisodes;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.availableQualities = availableQualities;
    }
}

module.exports = Series;

