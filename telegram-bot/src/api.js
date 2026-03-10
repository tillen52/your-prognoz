import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

import pool from './db.js';

const fateVariants = [
  'День даст шанс на важный разговор. Сохрани спокойствие и ясность.',
  'События выстроятся в понятную цепочку, если не спешить.',
  'Сегодня важно довериться интуиции и не тянуть с решением.'
];

const adviceVariants = [
  'Сделай одно маленькое действие и закрепи результат.',
  'Наведи порядок в одной вещи — и станет легче дышать.',
  'Выбери один приоритет и держи фокус.'
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.post('/forecast', async (req, res) => {
  const { tg_id, paid } = req.body;
  if (!tg_id) return res.status(400).json({ error: 'tg_id required' });

  const today = new Date().toISOString().slice(0, 10);

  // ensure user
  await pool.query(
    'INSERT INTO users (tg_id) VALUES ($1) ON CONFLICT (tg_id) DO NOTHING',
    [tg_id]
  );

  // limits
  const { rows: limitRows } = await pool.query(
    'SELECT paid_count FROM limits WHERE tg_id=$1 AND date=$2',
    [tg_id, today]
  );
  let paidCount = limitRows[0]?.paid_count ?? 0;

  if (paid) {
    if (paidCount >= 3) return res.status(429).json({ error: 'limit reached' });
    paidCount += 1;
    await pool.query(
      'INSERT INTO limits (tg_id, date, paid_count) VALUES ($1,$2,$3) ON CONFLICT (tg_id,date) DO UPDATE SET paid_count=$3',
      [tg_id, today, paidCount]
    );
  }

  const fate = pick(fateVariants);
  const advice = pick(adviceVariants);

  await pool.query(
    'INSERT INTO forecasts (tg_id, date, fate, advice) VALUES ($1,$2,$3,$4)',
    [tg_id, today, fate, advice]
  );

  res.json({
    forecast: { date: today, fate, advice },
    limitLeft: 3 - paidCount,
  });
});

app.get('/history', async (req, res) => {
  const { tg_id } = req.query;
  if (!tg_id) return res.status(400).json({ error: 'tg_id required' });
  const { rows } = await pool.query(
    'SELECT date, fate, advice FROM forecasts WHERE tg_id=$1 ORDER BY id DESC',
    [tg_id]
  );
  res.json({ items: rows });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));
