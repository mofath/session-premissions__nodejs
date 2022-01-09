import express from 'express';
import http from 'http';
import config from '../config';
import loader from '../loaders';
import supertests from 'supertest';

export default async function getTestApp() {
  const app = express();
  const server = http.createServer(app);
  const myapp = await loader(app);

  async function start() {
    server.listen(config.PORT, () => {
      myapp.start();
    });
  }

  async function stop() {
    await server.close();
  }

  return {
    request: supertests(app),
    start,
    stop,
  };
}
