import { logger } from '../../config/logger.js';

export const printerService = {
  printKitchen(ticket: unknown) {
    logger.info({ ticket }, 'Printing kitchen ticket');
  },
  printBar(ticket: unknown) {
    logger.info({ ticket }, 'Printing bar ticket');
  }
};
