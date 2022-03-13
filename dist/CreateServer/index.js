"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const debug_1 = require("debug");
class CreateServer {
    constructor(port) {
        this.maintainer = (0, debug_1.default)("2rproxy");
        this.port = port;
        this.server = express();
    }
    static getInstance(port) {
        if (!CreateServer.instance) {
            CreateServer.instance = new CreateServer(port);
        }
        return CreateServer.instance;
    }
    startService() {
        //load routes mapping
        this.routes();
        console.log("server listening on port " + this.port);
        this.server.listen(this.port);
    }
    // generateRouteFucntion
    generateRoute(method, url, callback) {
        if (method.toLowerCase() === "get") {
            return this.server.get(url, (req, res) => {
                callback(req, res);
            });
        }
        if (method.toLowerCase() === "post") {
            return this.server.post(url, (req, res) => {
                callback(req, res);
            });
        }
    }
    routes() {
        this.generateRoute("get", "/test", (req, res) => {
            console.log(req.headers);
            res.send("get");
        });
        this.generateRoute("post", "/test", (req, res) => {
            console.log(req.headers);
            res.send("post");
        });
    }
}
exports.default = CreateServer;
