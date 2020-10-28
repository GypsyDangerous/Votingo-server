import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"




export = new ApolloServer({ typeDefs, resolvers });
