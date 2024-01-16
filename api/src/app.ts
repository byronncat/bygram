import dotenv = require('dotenv');
dotenv.config();

import { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import express = require('express');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const routes = require('./routes/routes');
app.use('/api', routes.api);

// Catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;