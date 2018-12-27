import "babel-polyfill";

import User from "../../models/User";
import QuestionResponse from "../../models/QuestionResponse";

export const resolvers = {
    Query: {
        dummy1: () => "Bye"
    },

    Mutation: {
        createQuestionResponse: async (_, { input }, { session }) => {
            if (session.userId) {
                const questionResponse = new QuestionResponse();
                questionResponse.response = input.response;
                questionResponse.creatorId = session.userId;
                questionResponse.questionId = input.questionId;
                return await questionResponse.save();
            } else {
                return {
                    errors: [
                        {
                            path: "Session",
                            message:
                                "You are not authorised to perform this action"
                        }
                    ]
                };
            }
        }
    }
};
