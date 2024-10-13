import { Namespace, Socket } from 'socket.io';

abstract class BaseSocketManager {
  protected io: Namespace;

  constructor(io: Namespace) {
    this.io = io;
    this.configureSocketEvents();
  }

  public abstract handleEvents(socket: Socket): void;

  // Set up connection event handling
  protected configureSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Connected socket: ${socket.id}`);
      this.handleEvents(socket);
    });
  }
}

export default BaseSocketManager;
