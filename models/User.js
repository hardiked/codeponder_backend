var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";
import * as bcrypt from "bcryptjs";

var UserSchema = new Schema({
    username: { type: String, default: null },
    twitterId: { type: String, default: null },
    githubId: { type: String, unique: true },
    pictureUrl: { type: String, default: null },
    bio: { type: String, default: null }
});

UserSchema.pre("save", async function(next) {
    // var user=this;
    if (this.password) {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

module.exports = mongoose.model("User", UserSchema);
