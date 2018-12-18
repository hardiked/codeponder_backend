import "babel-polyfill";

import User from "../../models/User";
import CodeReviewRequest from "../../models/CodeReviewRequest";
import Offer from "../../models/Offer";

// TODO: to make the data loader for both user and code review request.
export const resolvers = {
    Offer: {
        offerSender: async ({ userId }, _, __) => {
            return await User.findById(userId);
        }
    },

    CodeReviewRequest: {
        owner: async ({ userId }, _, __) => {
            return await User.findById(userId);
        }
    },

    Query: {
        receivedOffers: async (_, __, { session }) => {
            const reviewsRequestCreated = await CodeReviewRequest.find({
                userId: session.userId
            });
            var i = 0;
            var final = [];
            for (i = 0; i < reviewsRequestCreated.length; i++) {
                const data = await Offer.find({
                    codeReviewRequestId: reviewsRequestCreated[i]._id
                });
                console.log(data);
                if (data) {
                    var j = 0;
                    for (j = 0; j < data.length; j++) {
                        var offer = {};
                        offer.codeReviewRequestId = data[j].codeReviewRequestId;
                        offer.userId = data[j].userId;
                        offer.status = data[j].status;
                        offer.codeReviewRequest = reviewsRequestCreated[i];
                        final.push(offer);
                    }
                }
            }
            return final;
        }
    },

    Mutation: {
        updateOfferStatus: async (
            _,
            { input: { userId, codeReviewRequestId, status } },
            { session }
        ) => {
            let offer = await Offer.findOne({
                userId: userId,
                codeReviewRequestId: codeReviewRequestId
            });
            if (offer) {
                offer.status = status;
                await offer.save();
                const codeReviewReqest = await CodeReviewRequest.findById(
                    codeReviewRequestId
                );
                var final = {};

                final.codeReviewRequestId = codeReviewRequestId;
                final.userId = userId;
                final.status = status;
                final.codeReviewRequest = codeReviewReqest;
                return { offer: final };
            } else {
                return {
                    offer: null
                };
            }
        }
    }
};
