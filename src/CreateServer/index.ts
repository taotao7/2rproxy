import * as express from "express";
import axios, { Method } from "axios";
import * as url from "url";

import debug from "debug";

type UrlMappingType = {
	target: string;
	url: string;
};

class CreateServer {
	port: number;
	server: express.Application;
	maintainer: any;
	private static instance: CreateServer;
	urlMapping: UrlMappingType[];

	private constructor(port: number) {
		this.maintainer = debug("2rproxy");
		this.port = port;
		this.server = express();
		this.urlMapping = [{ target: "test.test", url: "/test" }];
	}

	public static getInstance(port: number) {
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
	generateRoute(method: string, url: string, callback: Function) {
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
		this.generateRoute(
			"get",
			"/*",
			(req: express.Request, res: express.Response) => {
				//TODO 多个urlMapping设置
				if (this.urlMapping[0].url === req.url) {
					console.log(`${this.urlMapping[0].target}:8080${req.url}`);
					const copyHeaders = Object.assign({}, req.headers);
					this.proxyRequest(
						"get",
						`http://${this.urlMapping[0].target}:8080${req.url}`,
						{ headers: copyHeaders }
					)
						.then((r) => {
							console.log("from target server", r.data);
							res.set(r.headers);
							res.send(r.data);
						})
						.catch((e) => {
							console.log("error:", e);
							res.send("fail to proxy");
						});
				}
			}
		);

		this.generateRoute(
			"post",
			"/*",
			(req: express.Request, res: express.Response) => {
				console.log(req.headers);
				res.send("post");
			}
		);
	}

	parseUrl(targetUrl: string) {
		console.log(targetUrl);
		console.log(url);
		// console.log(url(targetUrl));
	}

	proxyRequest(method: Method, url: string, options: {} = {}) {
		return axios({ method, url, ...options });
	}
}

export default CreateServer;
