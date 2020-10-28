import mongoose from "mongoose";
import { pollSubmitSchema } from "../utils/JoiSchemas";
import Poll from "../models/poll.model";
import uid from "uid";
// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		hello: (parent: any, { name }: any) => `Hello ${name}!`,
		poll: (parent: any, { id }: any) => {
			return Poll.findOne({ _id: id });
		},
		polls: () => {
			return Poll.find()
		}
	},
	Mutation: {
		createPoll: (parent: any, args: any) => {
			const { name, description, options, private: isPrivate } = args;
			const { value, error } = pollSubmitSchema.validate(args);
			if (error) {
				throw new Error(error.details[0].message);
			}
			const id = uid();
			const pollObj = {
				...value,
				options: value.options.map((name: string) => ({ name, votes: 0 })),
				uuid: id,
				creator: "anonymous",
				private: !!value.private,
			};
			const newPoll = new Poll(pollObj);
			return newPoll.save();
		},
		vote: async (parent: any, { id, option }: any) => {
			const poll: any = await Poll.findOne({ _id: id });
			const optionIdx = poll.options.findIndex((op: any) => op.name === option);
			const votedOption = { ...poll.options[optionIdx] };
			poll.options[optionIdx] = { ...votedOption, votes: votedOption.votes + 1 };
			poll.markModified(`options.${optionIdx}.votes`);
			return poll.save()
		},
	},
};

export = resolvers;
