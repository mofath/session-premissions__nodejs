import express from 'express';
import http from 'http';
import config from './config';
import logger from './core/logger';
import loader from './loaders';

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const myapp = await loader(app);

  server
    .listen(config.PORT, () => {
      logger.info(`🛡️  Server listening on port: ${config.PORT} 🛡️`);
      myapp.start();
    })
    .on('error', (error: any) => {
      if (error.syscall !== 'listen') throw error;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          logger.error(`❌ PORT ${config.PORT} requires elevated privileges`);
          shutdown('EACCES');
          break;
        case 'EADDRINUSE':
          logger.error(`❌ PORT ${config.PORT} is already in use`);
          shutdown('EADDRINUSE');
          break;
        default:
          throw error;
      }
    });

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', () => shutdown('unhandledRejection'));

  async function shutdown(signal: string) {
    logger.error(`${signal} received.`);
    //@TODO should cose db connection here
    logger.info('Closing database connection.');
    server.close(() => {
      process.exit(1);
    });
  }
}

startServer();