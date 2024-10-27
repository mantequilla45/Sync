import { Namespace, Socket } from 'socket.io';
import BaseSocketManager from './BaseSocketManager';
import { saveDocument } from '../actions/DocumentActions/saveDocument';
import { loadDocument } from '../actions/DocumentActions/loadDocument';

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
      this.documents.set(room, processContent(content));
      socket.to(room).emit('contentUpdated', this.documents.get(room));
    });

    socket.on('joinRoom', async (room: string, callback) => {
      socket.join(room);
      console.log(`${socket.id} has joined the room ${room}`);

      if (!this.documents.has(room)) {
        const documentContent = await loadDocument(room);
        if (documentContent) {
          this.documents.set(room, documentContent);
        } else {
          console.error(`Failed to load document for room: ${room}`);
          return;
        }
      }
      console.log(`${socket.id}   ${this.documents.get(room)}`);
      callback(this.documents.get(room));
      socket.to(room).emit('contentUpdated', this.documents.get(room));
    });



    socket.on('saveDocument', (room: string, projectID: string) => {
      const document = this.documents.get(room);
      if (document !== undefined) {
        saveDocument(room, projectID, document);
      }
    });

    socket.on('leaveRoom', (room: string) => {
      socket.leave(room);
      const roomSize = this.io.adapter.rooms.get(room)?.size;
      if (roomSize === 0) {
        console.log("test");
        this.documents.delete(room);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  }
}

export default DocumentSocketManager;
