import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from './env.js';

let io: Server;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: { origin: env.CORS_ORIGIN, credentials: true }
  });

  io.on('connection', (socket) => {
    socket.on('join-role', (role: string) => socket.join(role));
    socket.on('join-branch', (branchId: string) => socket.join(`branch:${branchId}`));
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket not initialized');
  return io;
};
