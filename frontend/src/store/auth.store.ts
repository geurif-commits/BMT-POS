import { create } from 'zustand';
import { UserSession } from '../types';

interface AuthState {
  session: UserSession | null;
  setSession: (session: UserSession | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session })
}));
