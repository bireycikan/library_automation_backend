import "dotenv/config";
import debug from "debug";
const dbDebug = debug("postgresql");

import pg from "pg";
const { Pool, Client } = pg;

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const fallbackPort = "5455";
const config = {
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || fallbackPort, 10),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
}

// export const client = new Client(config);
export const pool = new Pool(config)

interface IDB {
  connect: () => Promise<void>;
}

const db: IDB = {
  connect: async function (): Promise<void> {
    try {
      await pool.connect();
      dbDebug("Database connection is established successfuly!");
    } catch (err) {
      dbDebug("Something failed while connection to database: more info => %o", err)
    }
  },
}

export default db;