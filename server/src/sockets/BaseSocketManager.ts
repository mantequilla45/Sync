import { Namespace, Socket } from 'socket.io';

abstract class BaseSocketManager {
  protected io: Namespace;

  constructor(io: Namespace) {
    this.io = io;
    this.configureSocketEvents();
  }

  public abstract handleEvents(socket: Socket): void;

  protected configureSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.handleEvents(socket);
    });
  }
}

export default BaseSocketManager;
