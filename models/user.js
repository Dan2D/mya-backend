const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// this will be our data base's data structure
const UserSchema = new Schema(
    {
        id: Number,
        username: String,
        email: String,
        password: String,
        lastLogged: {
            type: Date,
            default: Date.now()
        },
        roleID: Number
    },
    { timestamps: true }
);

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);