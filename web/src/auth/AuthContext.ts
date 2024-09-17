import {createContext, useContext} from 'react';
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims';
import { UserInfo as FirebaseUserInfo } from 'firebase/auth';  
import { User as AppUser } from '../../../_shared/interface';
 
export interface User extends AppUser, FirebaseUserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthContextValue {
  user: User | null;
  isOnline: boolean;
}
 
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isOnline: false,
});
 
export const useAuth = () => useContext(AuthContext);