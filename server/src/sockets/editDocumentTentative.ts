import { Socket } from 'socket.io';

let documentContent = ''; // Store document content on the server

export const editDocumentTentative = (socket: Socket) => {
  console.log('A user connected:', socket.id);

  // Emit current content when a client connects
  socket.emit('loadDocument', documentContent); // Send the current content to the new client

  // Listen for content updates from clients
  socket.on('updateContent', (newContent: string) => {
    console.log('Content updated:', newContent);
    documentContent = newContent; // Update the server's copy of the content
    socket.broadcast.emit('updateContent', newContent); // Broadcast to all other clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
};
