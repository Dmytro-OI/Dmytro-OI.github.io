import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompletedProvider } from './context/CompletedContext';
import Header from './components/header/Header';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Profile from './pages/UserProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CompletedProvider>
        <Router>
          <Header />
          <ToastContainer position="top-right" autoClose={3000} />
          <main className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </Router>
      </CompletedProvider>
    </AuthProvider>
  );
}

export default App;