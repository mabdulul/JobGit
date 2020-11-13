const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
const router = express.Router();

router.get("/:endpoint([\\/\\w\\.-]*)", (req, res) => {
	let endpoint =
		"https://jobs.github.com/positions.json?" + req.params.endpoint;
	axios
		.get(endpoint)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

// http://localhost:9000/.netlify/functions/api/description=ruby&page=1

router.get("/test", (req, res) => {
	res.json({
		hello: "hi!",
	});
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
