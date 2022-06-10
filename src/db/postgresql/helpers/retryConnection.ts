import { Pool } from "pg";
import { dbDebug } from "../../../debug/postgresqlDebug.js";


const sleep = (sleep: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, sleep);
  })
}

export const retryConnection = async (pool: Pool, retry?: number): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    retry = retry ?? 3;

    let start = 1;
    let wait = 3;

    let client;
    while (start <= retry) {
      try {
        dbDebug(`RE-TRYING, STAY TIGHT... COUNT: ${start}`)
        client = await pool.connect();
        resolve(`Connection established. Total retry: ${start}`);
      } catch (err) {
        client?.release();
        dbDebug(`Unexpected error occured. New connection attempt will be initialized in ${wait} seconds. ${retry - start} attempt left.`);
        await sleep(wait * 1000)
        start++;
      }
    }

    // connection unsuccessful
    await pool.end();
    reject(new Error(`Database connection failed. Total retry: ${start}`))
  })
}
