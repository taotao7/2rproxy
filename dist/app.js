"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug_1 = require("debug");
const config_1 = require("./config/config");
const maintainer = (0, debug_1.default)("2rproxy");
const server = http.createServer((req, res) => {
    maintainer("received req", req.headers);
});
http.get("/test");
console.log("server listening on port", config_1.default.port);
server.listen(config_1.default.port);
