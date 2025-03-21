import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface DocumentSocketState {
  documentSocket: Socket | null;
  connectDocument: (token: string, room: string, onContentUpdate: (content: string) => void) => () => void;
  disconnectDocument: () => void;
}


export const useDocumentSocketStore = create<DocumentSocketState>((set, get) => ({
  documentSocket: null,

  connectDocument: (token: string, room: string, func: (a: any) => void) => {
    const documentSocket = io('http://localhost:4000/document', { auth: { token } });
    set({ documentSocket });
    documentSocket.emit('joinRoom', room, func);

    documentSocket.emit('loadDocument', room);

    documentSocket.on('disconnect', () => {
      set({ documentSocket: null });
      console.log('Disconnected from document namespace');
    });

    return () => {
      if (documentSocket) documentSocket.disconnect();
    };
  },

  disconnectDocument: () => {
    const { documentSocket } = get();
    if (documentSocket) {
      documentSocket.disconnect();
      set({ documentSocket: null });
      console.log('Disconnected from document namespace');
    }
  }
}));