import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface UserStatusSocketState {
    userStatusSocket: Socket | null;
    connectUserStatus: (token: string) => void;
    disconnectUserStatus: () => void;
}

export const useUserStatusSocketStore = create<UserStatusSocketState>((set, get) => ({
    userStatusSocket: null,
  
    connectUserStatus: (token: string) => {
      const userStatusSocket = io('http://localhost:4000/userStatus', { auth: { token } });
  
      userStatusSocket.on('connect', () => {
        set({ userStatusSocket });
        console.log('Connected to userStatus namespace with ID:', userStatusSocket.id);
      });
  
      userStatusSocket.on('disconnect', () => {
        set({ userStatusSocket: null });
        console.log('Disconnected from userStatus namespace');
      });
  
      return () => {
        if (userStatusSocket) userStatusSocket.disconnect();
      };
    },
  
    disconnectUserStatus: () => {
      const { userStatusSocket } = get();
      if (userStatusSocket) {
        userStatusSocket.disconnect();
        set({ userStatusSocket: null });
        console.log('Disconnected from userStatus namespace');
      }
    }
  }));