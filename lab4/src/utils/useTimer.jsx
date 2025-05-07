import { useState, useEffect } from 'react';

export default function useTimer() {
  const [time, setTime] = useState(() => {
    const saved = parseInt(localStorage.getItem('studyTime')) || 0;
    const m = Math.floor(saved / 60);
    const s = saved % 60;
    return `${m}хв ${s}сек`;
  });

  useEffect(() => {
    let studyTime = parseInt(localStorage.getItem('studyTime')) || 0;
    const interval = setInterval(() => {
      studyTime++;
      localStorage.setItem('studyTime', studyTime);
      const m = Math.floor(studyTime / 60);
      const s = studyTime % 60;
      setTime(`${m}хв ${s}сек`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}