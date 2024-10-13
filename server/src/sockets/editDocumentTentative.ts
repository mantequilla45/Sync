import { Socket } from 'socket.io';

let documentContent = ''; // Store document content on the server

export const editDocumentTentative = (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('loadDocument', documentContent);

  socket.on('updateContent', (newContent: string) => {
    console.log('Content updated:', newContent);
    documentContent = newContent;
    socket.broadcast.emit('updateContent', newContent);
  });

  socket.on('saveDocument', () => {

    console.log("Save the document")
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
};
