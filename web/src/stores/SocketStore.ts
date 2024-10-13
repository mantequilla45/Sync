import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  connect: (token: string) => void;
  disconnect: () => void;
  sendMessage: (event: string, data: any) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  isConnected: false,

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


