const express = require("express");

const app = express();

app.get("/", (req, res) => {
	console.log("body", req.body);
	console.log("query", req.query);
	res.send("this is final server");
});

app.get("/test", (req, res) => {
	console.log(req.headers);
	console.log("body", req.body);
	console.log("query", req.query);
	res.set({ "x-oss-test": "this is headers" });
	res.statusCode = 200;
	res.send("this is final server test path");
});
app.listen(8080);
