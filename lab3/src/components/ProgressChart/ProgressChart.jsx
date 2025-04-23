import React from 'react';
import './ProgressChart.css';

export default function ProgressChart({ completed, total }) {
  const percent = Math.round((completed / total) * 100);
  return (
    <div className="progress-chart">
      <div className="bar">
        <div className="fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="label">{percent}%</div>
    </div>
  );
}