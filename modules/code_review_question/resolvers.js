import "babel-polyfill";
var mongoose = require("mongoose");

import CodeReviewQuestion from "../../models/CodeReviewQuestion";
import User from "../../models/User";
import QuestionResponse from "../../models/QuestionResponse";

export const resolvers = {
    replies: {
        user: async ({ creatorId }, _, { userLoader }) =>
            userLoader.load(creatorId)
    },
    Query: {
        findCodeReviewQuestion: async (
            _,
            { path, repo, branch, username },
            {}
        ) => {
            return await CodeReviewQuestion.find({
                $or: [
                    {
                        path: path,
                        branch: branch,
                        repo: repo,
                        username: username
                    },
                    {
                        branch: branch,
                        repo: repo,
                        username: username
                    }
                ]
            });
        }
    },

    Response: {
        created_at: ({ id }, _, __) => {
            return mongoose.Types.ObjectId(id).getTimestamp();
        },

        replies: async ({ id }, _, { responseLoader }) =>
            responseLoader.load(id),

        user: async ({ creatorId }, _, { userLoader }) =>
            userLoader.load(creatorId)
    },

    Mutation: {
        createCodeReviewQuestion: async (_, { input }, { session }) => {
            if (session && session.userId) {
                const codeReviewQuestion = new CodeReviewQuestion();
                codeReviewQuestion.startingLineNumber =
                    input.startingLineNumber;
                codeReviewQuestion.endingLineNumber = input.endingLineNumber;
                codeReviewQuestion.question = input.question;
                codeReviewQuestion.path = input.path;
                codeReviewQuestion.repo = input.repo;
                codeReviewQuestion.username = input.username;
                codeReviewQuestion.branch = input.branch;
                codeReviewQuestion.creatorId = session.userId;
                await codeReviewQuestion.save();
                return codeReviewQuestion;
            } else {
                return {
                    errors: [
                        {
                            path: "session",
                            message:
                                "You need to be authorised to perform this action!"
                        }
                    ]
                };
            }
        }
    }
};
