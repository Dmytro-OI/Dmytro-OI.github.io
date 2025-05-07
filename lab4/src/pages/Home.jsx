import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="overlay">
        <h1>Вивчай мови з натхненням</h1>
        <p>Занурюйся в інтерактивні уроки, відстежуй свій прогрес і отримуй нагороди!</p>
        <div className="buttons">
          <Link to="/lessons" className="btn primary">Почати уроки</Link>
          <Link to="/practice" className="btn secondary">Практика</Link>
        </div>
      </div>
    </div>
  );
}