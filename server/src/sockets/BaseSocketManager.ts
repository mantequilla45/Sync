import { Server, Socket } from 'socket.io';

abstract class BaseSocketManager {
  protected io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public abstract handleEvents(socket: Socket): void;
    //Later use
  /*protected joinRoom(socket: Socket, roomId: string): void {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  }

  protected leaveRoom(socket: Socket, roomId: string): void {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  }*/
}

export default BaseSocketManager;
