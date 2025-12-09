import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";
// import url from "url";
import "../envConfig";

const dev = process.env.NEXT_PUBLIC_DRUPAL_ENV !== "production";
const hostname = dev ? process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_LOCAL : process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_FRONT;
const port = dev ? 3000 : 8080;

// console.log("process", process.env);
// when using middleware `hostname` and `port` must be provided below
const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = createServer(handler);
	const io = new Server(httpServer, {cookie: true});

	io.on("connection", (socket) => {
		console.log("socket.handshake.headers.user", socket.id);

		socket.on("player.game.join", (data, callback) => {
			socket.join(data.roomId);
			callback({status: "ok"});
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
