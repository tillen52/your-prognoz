import 'dotenv/config';
import { Bot } from 'grammy';

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN missing');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  await ctx.reply('Твой Прогноз 🐅\nОткрыть мини‑апку:', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Открыть', web_app: { url: 'https://example.com' } }]],
    },
  });
});

bot.command('ping', async (ctx) => ctx.reply('pong'));

bot.catch((err) => {
  console.error('Bot error:', err);
});

bot.start();
console.log('Bot started');
