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
        count: async (_, __, ___) => {
            return await CodeReviewQuestion.find().count();
        },
        findCodeReviewQuestion: async (_, { path, postId }, {}) => {
            return await CodeReviewQuestion.find({
                $or: [
                    {
                        path: path,
                        postId: postId
                    },
                    {
                        postId: postId
                    }
                ]
            });
        },
        homeQuestions: async (_, { offset, limit }, {}) => {
            // let questions = await CodeReviewQuestion.aggregate([
            //     {
            //         $group: {
            //             _id: {
            //                 repo: "$repo",
            //                 username: "$username",
            //                 startingLineNumber: "$startingLineNumber",
            //                 branch: "$branch"
            //             }
            //         }
            //     },
            //     {
            //         $project: {
            //             repo: "$_id.repo",
            //             branch: "$_id.branch",
            //             startingLineNumber: "$_id.startingLineNumber",
            //             username: "$_id.username"
            //         }
            //     }
            // ]);
            // console.log(questions);
            return await CodeReviewQuestion.find()
                .skip(offset)
                .limit(limit);
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
                codeReviewQuestion.postId = input.postId;
                codeReviewQuestion.codeSnippet = input.codeSnippet;
                codeReviewQuestion.programmingLanguages =
                    input.programmingLanguages;
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
