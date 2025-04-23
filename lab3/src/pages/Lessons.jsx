import React, { useState, useContext } from 'react';
import LessonCard from '../components/LessonCard/LessonsCard';
import { CompletedContext } from '../context/CompletedContext';
import './Lessons.css';

const allLessons = [
  { id: 1, level: 'A1', title: 'Основи граматики', description: 'Базові правила', video: 'https://www.youtube.com/embed/LsHC-H1gpeE' },
  { id: 2, level: 'A2', title: 'Розмовні фрази', description: 'Фрази для спілкування', video: 'https://www.youtube.com/embed/7Cru6h7HsSQ' },
  { id: 3, level: 'B1', title: 'Слухання та вимова', description: 'Практичні вправи', video: 'https://www.youtube.com/embed/dEcr9M0xKE4' },
  { id: 4, level: 'A1', title: 'Прості діалоги', description: 'Початкові розмови', video: 'https://www.youtube.com/embed/Slmwd4eQOkU' },
  { id: 5, level: 'A2', title: 'Моя родина', description: 'Лексика та вправи', video: 'https://www.youtube.com/embed/JT0FKgE-qPI' },
  { id: 6, level: 'B1', title: 'Опис місць', description: 'Розширена лексика', video: 'https://www.youtube.com/embed/Tb1n6Mb-RJE' },
  { id: 7, level: 'B2', title: 'Часові конструкції', description: 'Використання часів', video: 'https://www.youtube.com/embed/Ia2q2Fy_XqI' },
  { id: 8, level: 'B1', title: 'Фразові дієслова', description: 'Типові приклади', video: 'https://www.youtube.com/embed/x3t8NFxDgTM' },
  { id: 9, level: 'B2', title: 'Ділове листування', description: 'Формальна англійська', video: 'https://www.youtube.com/embed/ijQDxwUGIOg' },
  { id: 10, level: 'B2', title: 'Ідіоми та вирази', description: 'Кольорові фрази', video: 'https://www.youtube.com/embed/Cj4rpkPbWt0' },
];

export default function Lessons() {
  const [filter, setFilter] = useState('All');
  const { completed, setCompleted } = useContext(CompletedContext);

  const filtered = allLessons.filter(l => filter === 'All' || l.level === filter);

  const toggleComplete = (id) => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="lessons-page">
      <div className="filters">
        {['All','A1','A2','B1','B2'].map(lv => (
          <button
            key={lv}
            className={filter === lv ? 'active' : ''}
            onClick={() => setFilter(lv)}
          >{lv}</button>
        ))}
      </div>
      <div className="lessons-grid">
        {filtered.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            completed={completed.includes(lesson.id)}
            onComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}