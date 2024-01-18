class Subscription {
    constructor(subscriptionID, userID, description, price, quality, subscriptionType, signUpDate, friendInvited, isPaidAccount) {
        this.subscriptionID = subscriptionID;
        this.userID = userID;
        this.description = description;
        this.price = price;
        this.quality = quality;
        this.subscriptionType = subscriptionType;
        this.signUpDate = signUpDate;
        this.friendInvited = friendInvited;
        this.isPaidAccount = isPaidAccount;
    }
}

module.exports = Subscription;
