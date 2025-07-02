import { Pool } from 'pg';
// import { dbConfig } from './config'; // Make sure to adjust the import path to where your config file is located
import { logger } from '../utils/errors';
//import { postgresDBConfig } from './postgressql_config';
import * as dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'iprofdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root@123',
});

const connectPostgresDB = async () => {
    try {
      const client = await pool.connect();
      console.log('DB connected');
      return client;
    } catch (error) {
      logger.log('error', 'DB error: ' + error);
      process.exit(1);
    }
  };
  
  export default connectPostgresDB;
