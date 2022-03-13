import CreateServer from "./CreateServer";
import config from "./config/config";

const server = CreateServer.getInstance(config.port);

server.startService();
