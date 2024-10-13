import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { socketCORSConfig } from './config/corsConfig';
import DocumentSocketManager from './sockets/DocumentSocketManager';
import UserStatusSocketManager from './sockets/UserStatusSocketManager';
import { verifyIdToken } from './actions/_index';

class SocketManager {
  private readonly io: Server;
  private readonly documentSocketManager: DocumentSocketManager;
  private readonly userStatusSocketManager: UserStatusSocketManager;

  constructor(httpServer: HTTPServer) {
    this.io = new Server(httpServer, { cors: socketCORSConfig });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Unauthorized: No token provided'));
        }
        const decodedToken = await verifyIdToken(token);
        (socket as any).user = decodedToken;
        next();
      } catch (error) {
        next(new Error('Unauthorized: Invalid or expired token'));
      }
    });

    this.documentSocketManager = new DocumentSocketManager(this.io.of('/document'));
    this.userStatusSocketManager = new UserStatusSocketManager(this.io.of('/userStatus'));

    this.configureGlobalEvents();
  }

  private configureGlobalEvents(): void {
    // Global event listeners if needed (e.g., monitoring all connections)
    this.io.on('connection', (socket: Socket) => {
      console.log(`New connection established: ${socket.id}`);
    });
  }

  public getSocketInstance(): Server {
    return this.io;
  }
}

export default SocketManager;
