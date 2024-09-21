import { Socket } from "socket.io";

export const editDocumentTentative = (socket: Socket) => {
    socket.on('contentUpdate', (content: string) => {
        socket.broadcast.emit('contentUpdate', content);
    });
};