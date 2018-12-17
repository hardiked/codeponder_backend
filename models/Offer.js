var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import "babel-polyfill";

var OfferSchema = new Schema({
    userId: { type: String, required: true },
    codeReviewRequestId: { type: String, required: true },
    accepted: { type: Boolean, default: false }
});

OfferSchema.index({ userId: 1, codeReviewRequestId: 1 }, { unique: true });

module.exports = mongoose.model("Offer", OfferSchema);
