import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { socketCORSConfig } from './config/corsConfig';
import DocumentSocketManager from './sockets/DocumentSocketManager';
import UserStatusSocketManager from './sockets/UserStatusSocketManager';


class SocketManager {
  private io: Server;
  private documentSocketManager: DocumentSocketManager;
  private userStatusSocketManager: UserStatusSocketManager;


  constructor(httpServer: HTTPServer) {

    this.io = new Server(httpServer, { cors: socketCORSConfig });

    this.documentSocketManager = new DocumentSocketManager(this.io);
    this.userStatusSocketManager = new UserStatusSocketManager(this.io);


    this.configureSocketEvents();
  }

  private configureSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.onSocketConnection(socket);
    });
  }

  private onSocketConnection(socket: Socket): void {
    this.documentSocketManager.handleEvents(socket);
    this.userStatusSocketManager.handleEvents(socket);
  }

  public getSocketInstance(): Server {
    return this.io;
  }
}

export default SocketManager;
