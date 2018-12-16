import "babel-polyfill";

import CodeReviewRequest from "../../models/CodeReviewRequest";
import Offer from "../../models/Offer";
import User from "../../models/User";

export const resolvers = {
    list: {
        owner: async ({ userId }, _, __) => {
            const user = User.findById(userId);
            if (user) {
                return user;
            }
            return {
                id: "deleted",
                username: "deleted",
                email: "deleted"
            };
        }
    },
    Query: {
        listCodeReviewRequest: async () => {
            const allRequests = await CodeReviewRequest.find();
            var i = 0;
            var final = [];
            for (i = 0; i < allRequests.length; i++) {
                const valid = await Offer.findOne({
                    accepted: true,
                    codeReviewRequestId: allRequests[i]._id
                });
                if (!valid) {
                    final.push(allRequests[i]);
                }
            }
            return final;
        }
    }
};
