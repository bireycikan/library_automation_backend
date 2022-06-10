import "dotenv/config";
import pg from "pg";
import { dbDebug } from "../../debug/postgresqlDebug.js";
import { retryConnection } from "./helpers/retryConnection.js";

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

// listening pool events
pool.on("connect", (client) => {
  dbDebug("Database connection is established successfully!");
})

pool.on("error", (err, client) => {
  dbDebug("DB error raised: more info => %O, client: %O", err, client)
})

interface IDB {
  connect: () => Promise<void>;
}

const db: IDB = {
  connect: async function (): Promise<void> {
    try {
      await pool.connect();
    } catch (err) {
      dbDebug("Something failed while connecting to the database: more info => %O", err)
      try {
        const result = await retryConnection(pool, 5);
        dbDebug(result);
      } catch (err) {
        dbDebug(err);
      }
    }
  },
}

export default db;