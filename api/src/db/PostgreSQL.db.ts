import { logger } from '@utils';
import { PostgreSQL } from '@types';

const initOptions = {
  /* initialization options */
};
const pgp = require('pg-promise')(initOptions);

const connection = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,

  // to auto-exit on idle, without having to shut-down the pool;
  // see https://github.com/vitaly-t/pg-promise#library-de-initialization
  allowExitOnIdle: true,
};

const db: PostgreSQL = pgp(process.env.POSTGRES_URL || connection);
db.connect()
  .then(function (obj: any) {
    const serverVersion = obj.client.serverVersion;
    obj.done();
    logger.success(`Database connected - PostgreSQL v${serverVersion}`, 'PostgreSQL');
  })
  .catch(function (error: any) {
    logger.error(`${error}`, 'PostgreSQL');
  });

export default db;
