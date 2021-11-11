require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
const {
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");
import schema, { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  const app = express();
  // app.use(logger("tiny"))

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({ app });

  app.use("/static", express.static("uploads"));

  await new Promise((r) => app.listen({ port: PORT }, r));

  console.log(
    `🚀 apolloServer ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

startServer();

