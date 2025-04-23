import React from 'react';
import { NavLink } from 'react-router-dom';
import useTimer from '../../utils/useTimer';
import './Header.css';

function Header() {
  const time = useTimer();

  return (
    <header className="header">
      <NavLink to="/" className="logo" end>
        LanguageClub
      </NavLink>

      <nav className="nav">
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/lessons">Уроки</NavLink>
        <NavLink to="/practice">Практика</NavLink>
        <NavLink to="/progress">Прогрес</NavLink>
      </nav>
      <div className="timer">{time}</div>
    </header>
  );
}

export default Header;