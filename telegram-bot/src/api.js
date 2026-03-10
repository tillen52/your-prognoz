import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/forecast', (req, res) => {
  // TODO: replace with DB + logic
  const forecast = {
    date: new Date().toISOString().slice(0, 10),
    fate: 'День обещает ясность в важных решениях. Доверься простому пути.',
    advice: 'Сделай одно небольшое действие и закрепи результат.'
  };
  res.json({ forecast, limitLeft: 3 });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));
