import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

// Cria o pool de conexão do PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Cria a instância do Drizzle ORM
export const db = drizzle(pool, { schema });
