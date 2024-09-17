'use client';
 
import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {AuthContext, AuthContextValue, User} from './AuthContext';
 
export interface AuthProviderProps {
  user: User | null;
  
  children: React.ReactNode;
}


export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:4000', {
        query: { uid: user.uid }, // Adjust as necessary
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        setIsOnline(true);
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        setIsOnline(false);
        console.log('Disconnected from server');
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      setIsOnline(false);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isOnline,
  }), [user, isOnline]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
