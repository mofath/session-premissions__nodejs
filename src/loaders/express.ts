import express, { Application } from 'express';
import cors from 'cors';
import { baseErrorHandlerMiddleware } from '../api/middleware';
import setupRoutes from '../api/routes';

const expressLoader = async (app: Application) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb', strict: false }));
  app.use(express.urlencoded({ extended: true }));

  setupRoutes(app)

  app.use(baseErrorHandlerMiddleware);
};

export default expressLoader;
