import "babel-polyfill";

import CodeReviewRequest from "../../models/CodeReviewRequest";

export const resolvers = {
    Query: {
        listCodeReviewRequest: () => {
            return CodeReviewRequest.find();
        }
    }
};
