import { create } from 'zustand';
import { User } from '@/auth/AuthContext'; // Import your User type from AuthContext

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateProfilePicture: (photoURL: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateProfilePicture: (photoURL) =>
    set((state) => ({
      user: state.user ? { ...state.user, photoURL } : null,
    })),
}));
