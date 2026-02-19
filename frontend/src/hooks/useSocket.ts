import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export const useSocket = (onOrder: () => void) => {
  const session = useAuthStore((s) => s.session);
  useEffect(() => {
    if (!session) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000');
    socket.emit('join-role', session.role);
    socket.emit('join-branch', session.branchId);
    socket.on('order:new-items', onOrder);
    return () => { socket.disconnect(); };
  }, [session, onOrder]);
};
