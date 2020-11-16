var express = require("express");
var cors = require("cors");
var app = express();
const router = express.Router();

app.use(cors());

exports.router.get("/", (req, res) => {
	res.json({
		hello: "hi!",
	});
});

// exports.handler = function (event, context, callback) {
// 	callback(null, {
// 		statusCode: 200,
// 		body: "Hello, World",
// 	});
// };
