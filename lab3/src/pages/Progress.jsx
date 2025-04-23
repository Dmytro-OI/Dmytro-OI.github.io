import React, { useContext } from 'react';
import ProgressChart from '../components/ProgressChart/ProgressChart';
import { CompletedContext } from '../context/CompletedContext';
import './Progress.css';

export default function Progress() {
  const { completed } = useContext(CompletedContext);
  const total = 10; 

  return (
    <div className="progress-page">
      <h2>Мій прогрес</h2>
      <ProgressChart completed={completed.length} total={total} />
      <div className="stats">
        <p>Пройдено уроків: {completed.length} з {total}</p>
      </div>
    </div>
  );
}