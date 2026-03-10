import 'dotenv/config';
import pool from './db.js';

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  tg_id BIGINT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forecasts (
  id SERIAL PRIMARY KEY,
  tg_id BIGINT NOT NULL,
  date DATE NOT NULL,
  fate TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS limits (
  id SERIAL PRIMARY KEY,
  tg_id BIGINT NOT NULL,
  date DATE NOT NULL,
  paid_count INT DEFAULT 0,
  UNIQUE (tg_id, date)
);
`;

async function run() {
  await pool.query(sql);
  await pool.end();
  console.log('Migration done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
