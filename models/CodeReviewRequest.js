var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";

var CodeReviewRequestSchema = new Schema({
    userId: { type: String, required: true },
    numDays: { type: Number, default: null },
    codeUrl: { type: String },
    techTags: { type: Array },
    notes: { type: String }
});

module.exports = mongoose.model("CodeReviewRequest", CodeReviewRequestSchema);
