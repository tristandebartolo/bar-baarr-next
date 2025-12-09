"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
// import url from "url";
require("../envConfig");
const dev = process.env.DRUPAL_ENV !== "production";
const hostname = dev ? process.env.DRUPAL_HOSTNAME_LOCAL : process.env.DRUPAL_HOSTNAME_FRONT;
const port = dev ? 3000 : 80;
// console.log("process", process.env);
// when using middleware `hostname` and `port` must be provided below
const app = (0, next_1.default)({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = (0, node_http_1.createServer)(handler);
    const io = new socket_io_1.Server(httpServer, { cookie: true });
    io.on("connection", (socket) => {
        console.log("socket.handshake.headers.user", socket.id);
        socket.on("player.game.join", (data, callback) => {
            socket.join(data.roomId);
            callback({ status: "ok" });
        });
        socket.on("disconnect", () => {
            // const userToUpdate = socket.handshake?.headers?.user;
        });
    });
    httpServer.once("error", (err) => {
        console.error(err);
        process.exit(1);
    }).listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
