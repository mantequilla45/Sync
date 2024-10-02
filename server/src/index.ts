import AppServer from './AppServer';
import SocketManager from './SocketManager';

const port = process.env.PORT || 4000;

// Initialize AppServer (Express + HTTP server)
const appServer = new AppServer();

// Get HTTP server instance
const httpServer = appServer.getHttpServer();

// Initialize SocketManager (Socket.IO)
const socketManager = new SocketManager(httpServer);

// Start the HTTP server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
