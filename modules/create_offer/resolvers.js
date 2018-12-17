import "babel-polyfill";

import Offer from "../../models/Offer";

export const resolvers = {
    Query: {
        bye13: () => "Bye"
    },

    Mutation: {
        createOffer: async (_, { input }, { session }) => {
            const offer = new Offer();
            offer.userId = input.userId;
            offer.codeReviewRequestId = input.codeReviewRequestId;
            try {
                const data = await offer.save();
                return {
                    ok: true
                };
            } catch (err) {
                if (err.errmsg.includes("duplicate")) {
                    return {
                        ok: false
                    };
                }
            }
        }
    }
};
