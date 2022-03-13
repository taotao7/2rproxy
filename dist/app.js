"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateServer_1 = require("./CreateServer");
const config_1 = require("./config/config");
const server = CreateServer_1.default.getInstance(config_1.default.port);
server.startService();
