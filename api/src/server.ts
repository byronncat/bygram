import 'dotenv/config';
import './database/MongoDB.database';
import express from 'express';
import configureApi from './api';
import configureServer from './configuration';

const serverConfiguration = express();
configureApi(serverConfiguration);
configureServer(serverConfiguration);

export default serverConfiguration;
