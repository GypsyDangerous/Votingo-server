import Joi from "joi";

const pollSubmitSchema = Joi.object({
	name: Joi.string().min(3).max(25).required(),
	description: Joi.string().min(3).max(500),
	options: Joi.array().min(2).unique(),
	private: Joi.boolean(),
});

export {pollSubmitSchema}