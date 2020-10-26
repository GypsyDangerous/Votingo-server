import express from "express";
const router = express.Router();
import Joi from "joi";
import uid from "uid";
import randomColor from "randomcolor";
import Poll from "../models/poll.model";

const pollSubmitSchema = Joi.object({
	name: Joi.string().min(3).max(25).required(),
	description: Joi.string().min(3).max(500),
	options: Joi.array().min(2).unique().required(),
	private: Joi.boolean(),
});

interface PollType {
	options: {
		[option: string]: { color: string; value: number };
	};
	uuid: string;
	creator: "anonymous" | string;
	private?: boolean;
	name: string;
	description?: string;
}

router.post("/create", async (req, res, next) => {
	const { value, error } = pollSubmitSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ code: 400, message: `invalid poll data: ${error.details[0].message}` });
	} else {
		const id = uid();
		const pollObj: PollType = {
			...value,
			options: value.options.reduce((acc: any, cur: string) => ({ ...acc, [cur]: { value: 0, color: randomColor() } }), {}),
			uuid: id,
			creator: "anonymous",
			private: !!value.private,
		};
		const newPoll = new Poll(pollObj);
		await newPoll.save();
		res.json({ code: 200, message: "poll created Successfully", id });
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
	// check permissions
	const { id } = req.params;
	await Poll.findOneAndDelete({ uuid: id });

	res.json({ code: 200, message: "Successfully deleted the poll" });
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	const poll = await Poll.findOne({ uuid: id });
	if (!poll) {
		return res.status(400).json({ code: 400, message: "invalid message id" });
	}
	res.json(poll);
});

router.get("/", async (req, res, next) => {
	try {
		const polls = await Poll.find();
		res.json(polls);
	} catch (err) {
		next(err);
	}
});

export = router;
