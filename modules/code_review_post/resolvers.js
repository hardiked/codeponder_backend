import "babel-polyfill";
var mongoose = require("mongoose");

import CodeReviewQuestion from "../../models/CodeReviewQuestion";
import User from "../../models/User";
import CodeReviewPost from "../../models/CodeReviewPost";
import QuestionResponse from "../../models/QuestionResponse";

export const resolvers = {
    Query: {
        getPostById: (_, { id }, ___) => {
            return CodeReviewPost.findById(id);
        }
    },

    Mutation: {
        findOrCreateCodeReviewPost: async (_, { input }, { session }) => {
            // console.log(input);
            if (session.userId) {
                let codeReviewPost = await CodeReviewPost.findOne({
                    commitId: input.commitId,
                    repo: input.repo,
                    repoOwner: input.repoOwner
                });
                if (!codeReviewPost) {
                    codeReviewPost = new CodeReviewPost();
                    codeReviewPost.programmingLanguages =
                        input.programmingLanguages;
                    codeReviewPost.repo = input.repo;
                    codeReviewPost.topics = input.topics;
                    codeReviewPost.commitId = input.commitId;
                    codeReviewPost.repoOwner = input.repoOwner;
                    codeReviewPost.description = input.description;
                    codeReviewPost.creatorId = session.userId;
                    await codeReviewPost.save();
                }
                console.log(codeReviewPost);
                return codeReviewPost;
            } else {
                return [];
            }
        }
    }
};
