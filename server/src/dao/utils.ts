import { getDBClient } from "../db/utils";
import { QueryConfig } from "pg";

export async function runQuery(query: QueryConfig) {
  const dbClient = getDBClient();
  try {
    dbClient.connect();
    const result = await dbClient.query(query);
    return result;
  } catch (error) {
    console.error(`Error executing query: ${JSON.stringify(query, null, 2)}`);
    throw error;
  } finally {
    dbClient.end();
  }
}
