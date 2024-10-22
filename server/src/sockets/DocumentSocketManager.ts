import { Namespace, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';

class DocumentSocketManager extends BaseSocketManager {

  private readonly documents: Map<string, string>;

  constructor(io: Namespace) {
    super(io);
    this.documents = new Map<string, string>();
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
      this.documents.set(room, processedContent);
      socket.to(room).emit('contentUpdated', this.documents.get(room));
    });

    socket.on('joinRoom', (room: string) => {
      if(!this.documents.has(room)){
        this.documents.set(room, "");
      }
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('loadContent', (room: string) => {
      console.log(room);
      socket.to(room).emit('contentUpdated', this.documents.get(room));
      console.log(this.documents.keys());
      console.log(this.documents.get(room));
    })

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
