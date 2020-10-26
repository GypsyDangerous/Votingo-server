import express from "express";
const router = express.Router();
import Joi from "joi";
import uid from "uid";

import Poll from "../models/poll.model";

const pollSubmitSchema = Joi.object({
	name: Joi.string().min(3).max(25).required(),
	description: Joi.string().min(3).max(500),
	options: Joi.array().min(2).unique(),
	private: Joi.boolean(),
});

router.post("/create", async (req, res, next) => {
	const { value, error } = pollSubmitSchema.validate(req.body);
	if (error) {
		res.status(400).json({ code: 400, message: error.details[0].message });
	} else {
		const id = uid();
		const pollObj = {
			...value,
			options: value.options.reduce((acc: any, cur: string) => ({ ...acc, [cur]: 0 }), {}),
			uuid: id,
			creator: "anonymous",
			private: !!value.private,
		};
		const newPoll = new Poll(pollObj);
		await newPoll.save();
		res.json({ code: 200, message: "poll created", id });
	}
});

router.patch("/vote/:id", async (req, res, next) => {
	const { id } = req.params;
	const { option } = req.body;
	const poll = await Poll.findOne({ uuid: id });
	if (!poll) {
		return res.status(400).json({ code: 400, message: "invalid poll id" });
	}
	if (poll.options[option] == undefined) {
		return res.status(400).json({ code: 400, message: "invalid option" });
	}
	poll.options[option] += 1;
	poll.markModified("options." + option);
	await poll.save();
	res.json({ code: 200, message: "success" });
});

router.delete("/delete/:id", async (req, res, next) => {
	const { id } = req.params;
	await Poll.findOneAndDelete({ uuid: id });

	res.json({ code: 200, message: "Successfully deleted the poll" });
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	const poll = await Poll.findOne({ uuid: id });
	if (!poll) {
		res.status(400).json({ code: 400, message: "invalid message id" });
	}
	res.json(poll);
});

router.get("/", async (req, res, next) => {
	try{
		const polls = await Poll.find()
        res.json(polls)
    }catch(err){
        next(err)
    }
})

export = router;
