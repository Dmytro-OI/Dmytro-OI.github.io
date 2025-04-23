import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CompletedProvider } from './context/CompletedContext';
import Header from './components/header/Header';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import './App.css';

function App() {
  return (
    <CompletedProvider>
      <Router>
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </Router>
    </CompletedProvider>
  );
}

export default App;