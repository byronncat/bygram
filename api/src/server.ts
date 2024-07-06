import 'dotenv/config';
import './database/MongoDB.database';
import express from 'express';
import configureApi from './api';
import configureServer from './configuration';
import configureErrorHandler from './error-handler';

const serverConfiguration = express();
configureServer(serverConfiguration);
configureApi(serverConfiguration);
configureErrorHandler(serverConfiguration);

export default serverConfiguration;
