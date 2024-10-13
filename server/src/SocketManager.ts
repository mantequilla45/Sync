import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { socketCORSConfig } from './config/corsConfig';
import DocumentSocketManager from './sockets/DocumentSocketManager';
import UserStatusSocketManager from './sockets/UserStatusSocketManager';
import { authenticateSocket } from './Middleware';

class SocketManager {
  private readonly io: Server;
  private readonly documentSocketManager: DocumentSocketManager;
  private readonly userStatusSocketManager: UserStatusSocketManager;

  constructor(httpServer: HTTPServer) {
    this.io = new Server(httpServer, { cors: socketCORSConfig });
    this.io.use(authenticateSocket);

    this.documentSocketManager = new DocumentSocketManager(this.io.of('/document'));
    this.userStatusSocketManager = new UserStatusSocketManager(this.io.of('/userStatus'));

    this.io.of('/document').use(authenticateSocket);
    this.io.of('/userStatus').use(authenticateSocket);
    this.configureGlobalEvents();
  }

  private configureGlobalEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.userStatusSocketManager.handleEvents(socket);
      this.documentSocketManager.handleEvents(socket);
    });
  }

  public getSocketInstance(): Server {
    return this.io;
  }
}

export default SocketManager;
