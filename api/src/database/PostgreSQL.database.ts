import { logger } from '@utilities';
import type { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import type { PostgreSQL } from '@types';

const initOptions = {
  /* initialization options */
};
const pgp = require('pg-promise')(initOptions);

// Database connection
const connection: IConnectionParameters = {
  // host: process.env.POSTGRES_HOST,
  // port: process.env.POSTGRES_PORT,
  // database: process.env.POSTGRES_DB,
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  connectionString: process.env.POSTGRES_URI + '?ssl=true',
  allowExitOnIdle: true,
};

const database: PostgreSQL = pgp(connection);
database
  .connect()
  .then(function (obj: any) {
    const serverVersion = obj.client.serverVersion;
    obj.done();
    logger.success(
      `Database connected - PostgreSQL v${serverVersion}`,
      'PostgreSQL',
    );
  })
  .catch(function (error: unknown) {
    logger.error(`${error}`, 'PostgreSQL');
  });

export default database;
