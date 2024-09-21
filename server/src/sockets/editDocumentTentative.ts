import { Socket } from 'socket.io';

export const editDocumentTentative = (socket: Socket) => {
  console.log('A user connected:', socket.id);

  // Listen for content updates from clients
  socket.on('sendContent', delta => {
    console.log(delta);
    socket.broadcast.emit("recieveContent", delta);
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
};
