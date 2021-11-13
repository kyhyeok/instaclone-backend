require("dotenv").config();
import express from "express";
import logger from "morgan";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServer } from "apollo-server-express";
const {
    graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");
// import schema, { typeDefs, resolvers } from "./schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import pubsub from "./pobsub";

const PORT = process.env.PORT;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const httpServer = createServer(app);

const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer }
);

const startServer = async () => {
    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req }) => {
            if (req) {
                return {
                    loggedInUser: await getUser(req.headers.token),
                };
            }
        },
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
    });

    await apolloServer.start();

    app.use(logger("tiny"));

    app.use("/static", express.static("uploads"));

    app.use(graphqlUploadExpress());

    apolloServer.applyMiddleware({ app });

    await new Promise((r) => httpServer.listen(PORT, r));

    console.log(
        `🚀 apolloServer ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
};

startServer();
