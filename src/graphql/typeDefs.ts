import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		hello(name: String!): String!
		polls: [Poll]
		poll(id: ID!): Poll
	}

	type PollOption {
		name: String!
		votes: Int!
	}

	type Poll {
		id: ID!
		uuid: ID!
		name: String!
		description: String
		private: Boolean
		creator: String!
		options: [PollOption]
	}

	type Mutation {
		createPoll(name: String!, description: String, options: [String]!, private: Boolean): Poll
		vote(id: ID!, option: String): Poll
	}
`;

export = typeDefs;
