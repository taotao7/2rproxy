import * as express from "express";
import debug from "debug";

interface Server {
	port: number;
	startService: Function;
}

class CreateServer implements Server {
	port: number;
	server: express.Application;
	maintainer: any;
	private static instance: CreateServer;

	private constructor(port: number) {
		this.maintainer = debug("2rproxy");
		this.port = port;
		this.server = express();
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
			"/test",
			(req: express.Request, res: express.Response) => {
				console.log(req.headers);
				res.send("get");
			}
		);

		this.generateRoute(
			"post",
			"/test",
			(req: express.Request, res: express.Response) => {
				console.log(req.headers);
				res.send("post");
			}
		);
	}
}

export default CreateServer;
