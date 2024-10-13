import { Namespace, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';

class DocumentSocketManager extends BaseSocketManager {
  constructor(io: Namespace) {
    super(io);
  }

  public handleEvents(socket: Socket): void {
    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on('updateContent', (roomId: string, newContent: any) => {
      console.log(`Content updated in room ${roomId}:`, newContent);
      socket.to(roomId).emit('updateContent', newContent);
    });
  }
}

export default DocumentSocketManager;
