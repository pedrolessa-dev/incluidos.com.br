import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query(
    "drop schema if exists public cascade; create schema public;",
  );
});

test("GET to /api/v1/migrations should return 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
