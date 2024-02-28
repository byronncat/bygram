import { PostgreSQL } from "./db";

const initOptions = {
  /* initialization options */
};
const pgp = require("pg-promise")(initOptions);

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

const db: PostgreSQL = pgp(connection);
db.connect()
  .then(function (obj: any) {
    const serverVersion = obj.client.serverVersion;
    obj.done();
    console.log(`[Database]: PostgreSQL connected`);
  })
  .catch(function (error: any) {
    console.log(`[Database]: PostgreSQL`, error);
  });

export default db;
