import request from "supertest"

import app from "../dist/app"

describe("app", () => {
	it("responds with unauthorized because it has no api key", done => {
		request(app).get("/what-is-this-even").set("Accept", "application/json").expect("Content-Type", /json/).expect(401, done);
	});
});

describe("GET /", () => {
	it("responds with a json message", done => {
		request(app).get("/").set("Accept", "application/json").expect("Content-Type", /json/).expect(
			200,
			{
				message: "🎥🎬🎬🍿🎥🎬🎬🍿",
			},
			done
		);
	});
});
