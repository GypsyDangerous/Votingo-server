import { ApolloServer } from "apollo-server-express";
import DataLoader from "dataloader";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const batchLoader: any = async (keys: any) => {};

export = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return {
			creatorLoader: new DataLoader(batchLoader),
		};
	},
});
