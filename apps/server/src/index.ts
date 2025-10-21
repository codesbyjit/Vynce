import http from "http"
import SocketServer from "./service/socket.js";
import { configDotenv } from "dotenv";

async function init() {
    configDotenv()
    const SocketService = new SocketServer()

    const httpServer = http.createServer()
    const PORT = process.env.PORT || 8080;

    SocketService.io.attach(httpServer);
    
    httpServer.listen(PORT, ()=>{
        console.log(`HTTP Server started at http://localhost${PORT}`)
    })

    SocketService.initListeners()
}

init()