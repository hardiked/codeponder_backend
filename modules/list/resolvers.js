import "babel-polyfill";

import CodeReviewRequest from "../../models/CodeReviewRequest";
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
        listCodeReviewRequest: () => {
            return CodeReviewRequest.find();
        }
    }
};
