class User {
    constructor(userID, Username, Email, Password, ActivationStatus, LoginAttempts, BlockStatus, FreeDaysLeft, role) {
        this.userID = userID;
        this.username = Username;
        this.email = Email;
        this.password = Password;
        this.activationstatus = ActivationStatus;
        this.loginattempts = LoginAttempts;
        this.blockstatus = BlockStatus;
        this.freedaysleft = FreeDaysLeft;
        this.role = role;
    }
}

module.exports = User;