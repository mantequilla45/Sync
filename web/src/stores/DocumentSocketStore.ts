import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface DocumentSocketState {
  documentSocket: Socket | null;
  connectDocument: (token: string) => void;
  disconnectDocument: () => void;
}

export const useDocumentSocketStore = create<DocumentSocketState>((set, get) => ({
  documentSocket: null,

  connectDocument: (token: string) => {
    const documentSocket = io('http://localhost:4000/document', { auth: { token } });

    documentSocket.on('confirmConnect', (data) => {
      set({ documentSocket });
      console.log('Connected to document namespace with ID:', data.socketId);
    });

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