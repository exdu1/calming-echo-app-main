import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from '../config/index.js';

export function setupMiddleware(app) {
  app.use(express.json());

  if (config.nodeEnv !== 'production') {
    app.use(cors());
  };

  const logFormat = config.nodeEnv === 'production' ? 'combined' : 'dev';
  app.use(morgan(logFormat));
};