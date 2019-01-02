var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";
import * as bcrypt from "bcryptjs";

var CodeReviewQuestionSchema = new Schema({
    startingLineNumber: { type: Number },
    endingLineNumber: { type: Number },
    question: { type: String },
    postId: { type: String },
    programmingLanguages: { type: String },
    path: { type: String },
    codeSnippet: { type: String },
    creatorId: { type: String }
});

module.exports = mongoose.model("CodeReviewQuestion", CodeReviewQuestionSchema);
