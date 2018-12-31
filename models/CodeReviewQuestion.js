var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";
import * as bcrypt from "bcryptjs";

var CodeReviewQuestionSchema = new Schema({
    startingLineNumber: { type: Number },
    endingLineNumber: { type: Number },
    question: { type: String },
    programmingLanguages: { type: String },
    path: { type: String },
    branch: { type: String },
    repo: { type: String },
    username: { type: String },
    creatorId: { type: String },
    creator: { type: String }
});

module.exports = mongoose.model("CodeReviewQuestion", CodeReviewQuestionSchema);
