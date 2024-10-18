'use client';

import * as React from 'react';
import { useMemo, useLayoutEffect } from 'react';
import { AuthContext, AuthContextValue, User } from './AuthContext';
import { getToken } from './getToken';
import { useUserStatusSocketStore } from '@/stores/UserStatus';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
  const { connectUserStatus, disconnectUserStatus } = useUserStatusSocketStore();

  useLayoutEffect(() => {
    const initializeSocket = async () => {
      if (user) {
        const token = await getToken();
        connectUserStatus(token?.token);
        return () => {
          disconnectUserStatus();
        };
      }
    };
    initializeSocket();
  }, [user, connectUserStatus, disconnectUserStatus]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
