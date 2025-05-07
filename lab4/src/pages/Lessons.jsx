import React, { useContext, useEffect, useState } from 'react';
import { CompletedContext } from '../context/CompletedContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import LessonCard from '../components/LessonCard/LessonsCard';
import './Lessons.css';

export default function Lessons() {
  const { completed, setCompleted } = useContext(CompletedContext);
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsCollection = collection(db, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsList = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(lessonsList);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, []);

  const filtered = lessons.filter(l => filter === 'All' || l.level === filter);

  const toggleComplete = (id) => {
    if (!user) {
      alert('Будь ласка, увійдіть, щоб позначити урок як пройдений.');
      return;
    }
  
    const newCompleted = completed.includes(id)
      ? completed.filter(x => x !== id)
      : [...completed, id];
  
    console.log('Toggling complete for lesson ID:', id);
    console.log('Current completed state:', completed);
    console.log('New completed state after toggle:', newCompleted);
  
    setCompleted(newCompleted); 
  };
  

  return (
    <div className="lessons-page">
      <div className="filters">
        {['All', 'A1', 'A2', 'B1', 'B2'].map(lv => (
          <button
            key={lv}
            className={filter === lv ? 'active' : ''}
            onClick={() => setFilter(lv)}
          >
            {lv}
          </button>
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