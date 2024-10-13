import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  userStatusSocket: Socket | null;
  isConnected: boolean;
  connectUserStatus: (token: string) => void;
  connectDocument: (token: string) => void;
  connect: (token: string) => void;
  disconnect: () => void;
  sendMessage: (event: string, data: any) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  isConnected: false,
  userStatusSocket: null,
  documentSocket: null,

  connectUserStatus: (token: string) => {
    const newSocket = io('http://localhost:4000/userStatus', {
      auth: { token }
    });

    newSocket.on('connect', () => {
      set({ userStatusSocket: newSocket });
      console.log("Socket ID", newSocket.id);
      newSocket.emit('userStatus', token);
    });

    newSocket.on('disconnect', () => {
      set({ userStatusSocket: null });
    });

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  },

  connectDocument: (token: string) => {
    // const newSocket = io('http://localhost:4000/document')
  },

  connect: (token: string) => {
    const newSocket = io('http://localhost:4000', {
      auth: { token },
    });

    newSocket.on('connect', () => {
      set({ socket: newSocket, isConnected: true });
      console.log('Connected to WebSocket server');

      newSocket.emit('userStatus', token);
    });

    newSocket.on('disconnect', () => {
      set({ socket: null, isConnected: false });
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  },

  disconnect: () => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (event: string, data: any) => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.emit(event, data);
    }
  },
}));


