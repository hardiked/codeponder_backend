import "babel-polyfill";

import CodeReviewRequest from "../../models/CodeReviewRequest";
import User from "../../models/User";

export const resolvers = {
    Query: {
        bye12: () => "Bye"
    },

    CodeReviewRequest: {
        owner: async ({ userId }, _, __) => {
            return await userId.findById(userId);
        }
    },

    Mutation: {
        createCodeReviewRequest: async (_, { input }, { session }) => {
            if (!session || !session.userId) {
                return {
                    errors: [
                        {
                            path: "Invalid",
                            message: "Login to create code review request"
                        }
                    ]
                };
            }
            const codeReviewRequest = new CodeReviewRequest();
            if (input.numDays) codeReviewRequest.numDays = input.numDays;
            codeReviewRequest.userId = session.userId;
            codeReviewRequest.codeUrl = input.codeUrl;
            codeReviewRequest.techTags = input.techTags;
            codeReviewRequest.notes = input.notes;
            await codeReviewRequest.save();
            return {
                errors: [],
                codeReview: codeReviewRequest
            };
        }
    }
};
