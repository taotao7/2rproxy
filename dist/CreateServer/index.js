"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios_1 = require("axios");
const url = require("url");
const debug_1 = require("debug");
class CreateServer {
    constructor(port) {
        this.maintainer = (0, debug_1.default)("2rproxy");
        this.port = port;
        this.server = express();
        this.urlMapping = [{ target: "test.test", url: "/test" }];
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
        this.generateRoute("get", "/*", (req, res) => {
            if (this.urlMapping[0].url === req.url) {
                console.log(`${this.urlMapping[0].target}:8080${req.url}`);
                this.proxyRequest("get", `http://${this.urlMapping[0].target}:8080${req.url}`)
                    .then((r) => {
                    console.log("from target server", r.data);
                    // TODO 解析返回的头和其他参数给客户端
                    res.send(r.data);
                })
                    .catch((e) => {
                    console.log("error:", e);
                    res.send("fail to proxy");
                });
            }
        });
        this.generateRoute("post", "/*", (req, res) => {
            console.log(req.headers);
            res.send("post");
        });
    }
    parseUrl(targetUrl) {
        console.log(targetUrl);
        console.log(url);
        // console.log(url(targetUrl));
    }
    proxyRequest(method, url, options = {}) {
        return (0, axios_1.default)({ method, url });
    }
}
exports.default = CreateServer;
