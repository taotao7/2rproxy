import * as http from "http";
import debug from "debug";
import config from "./config/config";

const maintainer = debug("2rproxy");

const server = http.createServer((req, res) => {
	maintainer("received req", req.headers);
	res.end("ok");
});

console.log("server listening on port", config.port);
server.listen(config.port);
