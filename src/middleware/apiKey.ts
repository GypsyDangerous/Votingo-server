import { Request, Response, NextFunction } from "express";

const apiKeys = new Map();
apiKeys.set("8AMZK6T-SDH4W30-NYFWMKT-QMVW111", true);

export default (req: Request, res: Response, next: NextFunction): void => {
	const origin = req.get("origin");
	if (origin) {
		next();
	} else {
		const key = req.get("X-API-Key");
		if (key) {
			if (apiKeys.has(key)) {
				next();
			} else {
				res.status(401).json({ message: "Unauthorized", code: 401 });
			}
		} else {
			res.status(401).json({ message: "Unauthorized", code: 401 });
		}
	}
};
