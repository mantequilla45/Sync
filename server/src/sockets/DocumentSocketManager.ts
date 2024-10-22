import { Namespace, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';

class DocumentSocketManager extends BaseSocketManager {
  constructor(io: Namespace) {
    super(io);
  }

  public handleEvents(socket: Socket): void {

    socket.emit('confirmConnect', {
      message: `Connection confirmed with socket ID: ${socket.id}`,
      socketId: socket.id
    });

    socket.on('updateContent', (room: string, content: string) => {
      const processContent = (input: string): string => {
        return input
          .replace(/ /g, '&nbsp;')
          .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
      };
      const processedContent = processContent(content);
      console.log("Sending Content:", processedContent);
    
      socket.to(room).emit('contentUpdated', processedContent);
    });
    
    
  
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('leaveRoom', (room: string) => {
      console.log(`Socket ${socket.id} left room: ${room}`);
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  }
}

export default DocumentSocketManager;
