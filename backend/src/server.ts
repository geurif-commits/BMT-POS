import { createServer } from 'http';
import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { initSocket } from './config/socket.js';

const server = createServer(app);
initSocket(server);

server.listen(env.PORT, () => logger.info(`Backend running on :${env.PORT}`));
