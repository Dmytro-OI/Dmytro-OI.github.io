import React, { createContext, useState, useEffect } from 'react';

export const CompletedContext = createContext();

export function CompletedProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem('completedLessons')) || [];
  });

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completed));
  }, [completed]);

  return (
    <CompletedContext.Provider value={{ completed, setCompleted }}>
      {children}
    </CompletedContext.Provider>
  );
}