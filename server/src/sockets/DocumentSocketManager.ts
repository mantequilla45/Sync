import { Server, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';  // Base class with shared functionality

// Store document content on the server (you can move this into a database or external storage later)
let documentContent = '';

class DocumentSocketManager extends BaseSocketManager {
  constructor(io: Server) {
    super(io);
    this.configureSocketEvents();
  }

  // Configure the socket event handlers
  private configureSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      this.handleEvents(socket);
    });
  }

  public handleEvents(socket: Socket): void {
    
    socket.emit('loadDocument', documentContent); 
    // Listen for content updates from clients
    socket.on('updateContent', (newContent: string) => {
      console.log('Content updated:', newContent);
      documentContent = newContent; 
      socket.broadcast.emit('updateContent', newContent); // Broadcast to all other clients
    });

    // Listen for save events
    socket.on('saveDocument', () => {
      console.log('Save the document');
      // Implement saving logic here (e.g., persist documentContent to a database)
    });
  }
}

export default DocumentSocketManager;
