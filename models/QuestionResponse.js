var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";

var QuestionResponseSchema = new Schema({
    response: { type: String },
    creatorId: { type: String },
    questionId: { type: String }
});

module.exports = mongoose.model("QuestionResponse", QuestionResponseSchema);
