import dotenv = require('dotenv');
dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import './database/MongoDB.database';
import Redis from './database/Redis.database';
import RedisStore from 'connect-redis';

import { logger as log } from '@utilities';
import setAPI from './api';
import { TIME } from './constants';
import type { Account } from './types';

const app: Express = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Session

declare module 'express-session' {
  export interface SessionData {
    user: {
      id: Account['id'];
    };
  }
}

const redisStore = new RedisStore({
  client: Redis,
  prefix: 'sess:',
});

app.use(
  session({
    name: 'session_id',
    store: redisStore,
    secret: process.env.TOKEN_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: TIME.COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  } as session.SessionOptions),
);

setAPI(app);

// Catch 404 and forward to error handler
app.use(function (next: NextFunction) {
  next(createError(404));
});

// Error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  log.error(err, 'Main Error Handler');
});

export default app;
