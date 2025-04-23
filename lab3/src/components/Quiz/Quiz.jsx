import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  { id: 1, question: 'Як перекладається слово "apple"?', options: ['Яблуко', 'Апельсин', 'Груша', 'Кавун'], correct: 'Яблуко' },
  { id: 2, question: 'Як перекладається слово "book"?', options: ['Ручка', 'Книга', 'Стіл', 'Вікно'], correct: 'Книга' },
  { id: 3, question: 'Яка форма дієслова "go" у минулому часі?', options: ['Goed', 'Went', 'Gone', 'Going'], correct: 'Went' },
  { id: 4, question: 'Як сказати "собака" англійською?', options: ['Cat', 'Pig', 'Dog', 'Cow'], correct: 'Dog' },
  { id: 5, question: 'Choose the correct article: ___ apple.', options: ['A', 'An', 'The', 'No article'], correct: 'An' },
  { id: 6, question: 'Which word is a verb?', options: ['Quick', 'Run', 'Blue', 'Happy'], correct: 'Run' },
  { id: 7, question: 'What is the synonym of "happy"?', options: ['Sad', 'Angry', 'Joyful', 'Boring'], correct: 'Joyful' },
  { id: 8, question: 'Which tense: "I have eaten."', options: ['Past Simple', 'Present Perfect', 'Future Simple', 'Past Continuous'], correct: 'Present Perfect' },
  { id: 9, question: 'Complete: "If I were you, I ___ help."', options: ['will', 'would', 'can', 'must'], correct: 'would' },
  { id: 10, question: 'Translate: "Вона вивчає англійську щодня."', options: ['She study English every day', 'She studying English every day', 'She studies English every day', 'She studied English every day'], correct: 'She studies English every day' }
];


export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct) {
      setScore(prev => prev + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-card">
      {showResult ? (
        <div className="result">
          <h2>Твій результат:</h2>
          <p>{score} з {questions.length}</p>
        </div>
      ) : (
        <div className="question-block">
          <h3>{questions[current].question}</h3>
          <div className="options">
            {questions[current].options.map(option => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
