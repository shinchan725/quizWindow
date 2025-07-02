// src/config.ts
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const postgresDBConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'iprofdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '........',
};
