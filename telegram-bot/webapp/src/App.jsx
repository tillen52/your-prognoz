import { useState } from 'react';
import './App.css';

const sampleForecast = {
  date: 'Сегодня',
  fate: 'День даст шанс на важный разговор. Не торопись — слушай внимательнее, чем говоришь.',
  advice: 'Сделай одно маленькое действие, которое давно откладывал.'
};

const history = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  date: `День ${i + 1}`,
  text: 'Тихий прогресс и ясность в решениях. Сохрани фокус на главном.'
}));

export default function App() {
  const [tab, setTab] = useState('main');

  return (
    <div className="app">
      <header className="header">
        <h1>Твой Прогноз</h1>
        <div className="subtitle">{sampleForecast.date}</div>
      </header>

      <div className="tabs">
        <button className={tab === 'main' ? 'active' : ''} onClick={() => setTab('main')}>Главная</button>
        <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>История</button>
      </div>

      {tab === 'main' && (
        <div className="card">
          <section>
            <h2>Судьба</h2>
            <p>{sampleForecast.fate}</p>
          </section>
          <section>
            <h2>Совет дня</h2>
            <p>{sampleForecast.advice}</p>
          </section>
          <div className="actions">
            <button className="primary">Новый прогноз (25⭐)</button>
            <div className="limit">Осталось 3/3 сегодня</div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="list">
          {history.map((h) => (
            <div key={h.id} className="list-item">
              <div className="date">{h.date}</div>
              <div className="text">{h.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
