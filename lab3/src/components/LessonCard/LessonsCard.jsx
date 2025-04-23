import React from 'react';
import './LessonsCard.css';

export default function LessonCard({ lesson, completed, onComplete }) {
  return (
    <div className={`lesson-card ${completed ? 'done' : ''}`}>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <div className="video-container">
        <iframe src={lesson.video} title={lesson.title} allowFullScreen />
      </div>
      <button onClick={() => onComplete(lesson.id)}>
        {completed ? 'Пройдено' : 'Відзначити як пройдений'}
      </button>
    </div>
  );
}