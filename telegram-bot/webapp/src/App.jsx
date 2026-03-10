import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getTgId() {
  const tg = window.Telegram?.WebApp;
  return tg?.initDataUnsafe?.user?.id || 1;
}

export default function App() {
  const [tab, setTab] = useState('main');
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [limitLeft, setLimitLeft] = useState(3);
  const [loading, setLoading] = useState(false);

  const tgId = getTgId();

  async function loadForecast(paid = false) {
    setLoading(true);
    const res = await fetch(`${API_URL}/forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tg_id: tgId, paid }),
    });
    const data = await res.json();
    if (res.ok) {
      setForecast(data.forecast);
      setLimitLeft(data.limitLeft ?? 0);
    }
    setLoading(false);
  }

  async function loadHistory() {
    const res = await fetch(`${API_URL}/history?tg_id=${tgId}`);
    const data = await res.json();
    if (res.ok) setHistory(data.items || []);
  }

  useEffect(() => {
    loadForecast(false);
    loadHistory();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Твой Прогноз</h1>
        <div className="subtitle">{forecast?.date || 'Сегодня'}</div>
      </header>

      <div className="tabs">
        <button className={tab === 'main' ? 'active' : ''} onClick={() => setTab('main')}>Главная</button>
        <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>История</button>
      </div>

      {tab === 'main' && (
        <div className="card">
          <section>
            <h2>Судьба</h2>
            <p>{forecast?.fate || 'Загружаю...'}</p>
          </section>
          <section>
            <h2>Совет дня</h2>
            <p>{forecast?.advice || ''}</p>
          </section>
          <div className="actions">
            <button className="primary" disabled={loading} onClick={() => loadForecast(true)}>
              Новый прогноз (25⭐)
            </button>
            <div className="limit">Осталось {limitLeft}/3 сегодня</div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="list">
          {history.map((h, i) => (
            <div key={i} className="list-item">
              <div className="date">{h.date}</div>
              <div className="text">{h.fate} {h.advice}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
