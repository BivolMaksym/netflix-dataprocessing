class Classification {
    constructor(classificationId, InterestedInFilms, InterestedInSeries, PreferedGenres, MinAge, ViewingClassification) {
        this.classificationId = classificationId;
        this.interestedInFilms = InterestedInFilms;
        this.interestedInSeries = InterestedInSeries;
        this.preferedGenres = PreferedGenres;
        this.minAge = MinAge;
        this.viewingClassification = ViewingClassification;
    }
}

module.exports = Classification;