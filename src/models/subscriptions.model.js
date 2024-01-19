class Subscription {
    constructor(subscriptionID, userID, description, price, quality, signUpDate, friendInvited, isPaidAccount) {
        this.subscriptionID = subscriptionID;
        this.userID = userID;
        this.description = description;
        this.price = price;
        this.quality = quality;
        this.signUpDate = signUpDate;
        this.friendInvited = friendInvited;
        this.isPaidAccount = isPaidAccount;
    }
}

module.exports = Subscription;
