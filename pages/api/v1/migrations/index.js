import migration from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method))
    return response.status(405).json({
      message: "Method not allowed",
    });

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migrations = await migration({
      dbClient,
      dryRun: request.method === "GET",
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    await dbClient.end();

    if (request.method === "POST" && migrations.length > 0)
      return response.status(201).json(migrations);

    return response.status(200).json(migrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
