import 'dotenv/config';
import { Bot } from 'grammy';
import pool from './db.js';

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN missing');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  await ctx.reply('Твой Прогноз 🐅\nОткрыть мини‑апку:', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Открыть', web_app: { url: 'https://your-prognoz-1.onrender.com' } }]],
    },
  });
});

bot.command('buy', async (ctx) => {
  const payload = `forecast_${Date.now()}`;
  await ctx.replyWithInvoice({
    title: 'Новый прогноз',
    description: '25⭐ за дополнительный прогноз',
    payload,
    provider_token: '',
    currency: 'XTR',
    prices: [{ label: 'Прогноз', amount: 25 }],
  });
});

bot.on('pre_checkout_query', async (ctx) => {
  await ctx.answerPreCheckoutQuery(true);
});

bot.on('message:successful_payment', async (ctx) => {
  const tgId = ctx.from.id;
  const today = new Date().toISOString().slice(0, 10);

  const { rows } = await pool.query(
    'SELECT paid_count FROM limits WHERE tg_id=$1 AND date=$2',
    [tgId, today]
  );
  let paidCount = rows[0]?.paid_count ?? 0;
  paidCount += 1;

  await pool.query(
    'INSERT INTO limits (tg_id, date, paid_count) VALUES ($1,$2,$3) ON CONFLICT (tg_id,date) DO UPDATE SET paid_count=$3',
    [tgId, today, paidCount]
  );

  await ctx.reply('Оплата прошла ✅ Можно получить новый прогноз в мини‑апке.');
});

bot.command('ping', async (ctx) => ctx.reply('pong'));

bot.catch((err) => {
  console.error('Bot error:', err);
});

bot.start();
console.log('Bot started');
