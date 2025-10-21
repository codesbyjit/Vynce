import { Server } from "socket.io";
import { Pub, Sub } from "./Redis.js";

class SocketServer {
  private _io: Server;

  constructor() {
    console.log("Socket Service - Init");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    // Subscribe once globally
    Sub.subscribe("MESSAGE");

    // Register Redis listener once
    Sub.on("message", (channel, message) => {
      if (channel === "MESSAGE") {
        console.log("Broadcasting message to all clients:", message);
        this._io.emit("message", message);
      }
    });
  }

  public initListeners() {
    const io = this._io;
    console.log("Socket Listener - Init");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected - ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message from ${socket.id} - ${message}`);
        await Pub.publish(
          "MESSAGE",
          JSON.stringify({ message, senderId: socket.id })
        );
      });

      socket.on("disconnect", () => {
        console.log(`Socket Disconnected - ${socket.id}`);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketServer;
