'use client';
 
import * as React from 'react';
import { useMemo } from 'react';
import {AuthContext, User} from './AuthContext';
 
export interface AuthProviderProps {
  user: User | null;
  
  children: React.ReactNode;
}


export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
