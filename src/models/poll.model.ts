import mongoose, {Model} from "mongoose"

const Schema = mongoose.Schema;

const pollSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: false },
		options: { type: Array, required: true },
		private: { type: Boolean, required: true },
		creator: { type: Object, required: true },
		uuid: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const poll = mongoose.model("poll", pollSchema);

export = poll;
