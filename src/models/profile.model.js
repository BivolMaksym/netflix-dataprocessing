class Profile {
    constructor(profileID, userID, classificationID, watchlistID, profileName, profilePhoto, age, language) {
        this.profileID = profileID;
        this.userID = userID;
        this.classificationID = classificationID;
        this.watchlistID = watchlistID;
        this.profileName = profileName;
        this.profilePhoto = profilePhoto;
        this.age = age;
        this.language = language;
    }
}

module.exports = Profile;
