'use client';

import * as React from 'react';
import { useMemo, useLayoutEffect } from 'react';
import { AuthContext, AuthContextValue, User } from './AuthContext';
import { getToken } from './getToken';
import { useSocketStore } from '@/stores/SocketStore';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
  const { connectUserStatus, disconnectAll } = useSocketStore();

  useLayoutEffect(() => {
    const initializeSocket = async () => {
      if (user) {
        const token = await getToken();

        connectUserStatus(token?.token);

        const socket = useSocketStore.getState().userStatusSocket;

        socket?.on('connect', () => {
          console.log("Socket connected, emitting userStatus event");
          socket.emit('userStatus', user.uid);
        });

        return () => {
          disconnectAll();
        };
      }
    };

    initializeSocket();
  }, [user, connectUserStatus, disconnectAll]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
