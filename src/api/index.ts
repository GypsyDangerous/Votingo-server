import express from "express"
import users from "./users"
import polls from "./polls"

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API - 🎥🎬🎬🍿",
	});
});

router.get("/polls", polls)

router.get("/users", users)

export = router;
