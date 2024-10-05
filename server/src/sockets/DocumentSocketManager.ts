import { Server, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';  // Base class with shared functionality

// Store document content on the server (you can move this into a database or external storage later)
let documentContent = '';

class DocumentSocketManager extends BaseSocketManager {
  constructor(io: Server) {
    super(io);
    this.configureSocketEvents();
  }

  private configureSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.handleEvents(socket);
    });
  }

  public handleEvents(socket: Socket): void {
    
    socket.emit('loadDocument', documentContent); 
    socket.on('updateContent', (newContent: string) => {
      console.log('Content updated:', newContent);
      documentContent = newContent; 
      socket.broadcast.emit('updateContent', newContent);
    });

    socket.on('saveDocument', () => {
      console.log('Save the document');
    });
  }
}

export default DocumentSocketManager;
