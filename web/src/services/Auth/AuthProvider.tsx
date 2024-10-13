'use client';

import * as React from 'react';
import { useMemo, useEffect } from 'react';
import { AuthContext, AuthContextValue, User } from './AuthContext';
import { getToken } from './getToken';
import { useSocketStore } from '@/stores/SocketStore';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}


export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {

  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    const initializeSocket = async () => {
      if (user) {
        const token = await getToken();
        console.log('User Token:', token?.token);
  
        connect(token?.token);
  
        const socket = useSocketStore.getState().socket;
  
        socket?.on('connect', () => {
          socket.emit('userStatus', user.uid);
        });

        return () => {
          disconnect();
        };
      }
    };
    initializeSocket();
  }, [user, connect, disconnect ]);
  
  

  const value = useMemo<AuthContextValue>(() => ({
    user
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
