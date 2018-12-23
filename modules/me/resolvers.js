import "babel-polyfill";

import User from "../../models/User";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers = {
    User: {
        accessToken: async (_, __, { session }) => {
            return session.accessToken;
        }
    },

    Query: {
        me: createMiddleware(middleware, (_, __, { session }) =>
            User.findById(session.userId)
        )
    }
};
