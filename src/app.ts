import express from "express"
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();
import mongoose from "mongoose";

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

import api from "./api"
import middlewares from "./middleware"

app.get("/", (req, res) => {
	res.json({
		message: "🎥🎬🎬🍿🎥🎬🎬🍿",
	});
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export = app;