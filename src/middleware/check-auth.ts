import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export = (req: any, res: any, next: NextFunction) => {
	try {
		const token = req?.headers?.authorization?.split(" ")[1];
		if (!token) {
			throw new Error("Missing Token");
		}
		const payload: any = jwt.verify(token, process.env.PRIVATE_KEY || "");
		req.userData = { userId: payload.userId };
		next();
	} catch (err) {
		return res.json({ success: false, code: 401, message: "Authorization failed" });
	}
};
