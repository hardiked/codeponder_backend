var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";

var CodeReviewPostSchema = new Schema({
    programmingLanguages: { type: Array },
    topics: { type: Array },
    repo: { type: String },
    commitId: { type: String },
    repoOwner: { type: String },
    description: { type: String },
    creatorId: { type: String }
});

module.exports = mongoose.model("CodeReviewPost", CodeReviewPostSchema);
