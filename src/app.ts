import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import graphql from "./graphql"

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || "";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection successful");
});

import api from "./api";
import middlewares from "./middleware";
import apiKey from "./middleware/apiKey";

app.get("/", (req, res) => {
	res.json({
		message: "🎥🎬🎬🍿🎥🎬🎬🍿",
	});
});

app.use(apiKey)

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 15,
		keyGenerator: (req: express.Request, res) => {
			return req.get("X-API-Key") || req.ip;
		},
	})
);

graphql.applyMiddleware({ app });

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export = app;
