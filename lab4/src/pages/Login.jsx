import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, saveUserToFirestore } from '../firebase/firebase'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegistering) {
        if (!name.trim()) {
          console.log('Помилка: ім’я порожнє');
          toast.error('Будь ласка, введіть ім’я', { position: 'top-right', autoClose: 3000 });
          return;
        }
        if (!age || isNaN(age) || age < 1 || age > 120) {
          console.log('Помилка: некоректний вік');
          toast.error('Будь ласка, введіть коректний вік (1-120)', { position: 'top-right', autoClose: 3000 });
          return;
        }
        console.log('Спроба реєстрації');
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user, { name, age: parseInt(age) });
        console.log('Реєстрація успішна, показуємо сповіщення');
        toast.success('Реєстрація успішна!', { position: 'top-right', autoClose: 3000 });
        navigate('/progress');
      } else {
        console.log('Спроба входу');
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user);
        console.log('Вхід успішний, показуємо сповіщення');
        toast.success('Вхід успішний!', { position: 'top-right', autoClose: 3000 });
        navigate('/progress');
      }
    } catch (error) {
      console.log('Помилка:', error.message);
      toast.error('Помилка: ' + error.message, { position: 'top-right', autoClose: 3000 });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Спроба входу через Google');
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      console.log('Вхід через Google успішний, показуємо сповіщення');
      toast.success('Успішний вхід через Google!', { position: 'top-right', autoClose: 3000 });
      navigate('/progress');
    } catch (error) {
      console.log('Google-помилка:', error.message);
      toast.error('Google-помилка: ' + error.message, { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Реєстрація' : 'Вхід'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Ім’я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Вік"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
              max="120"
            />
          </>
        )}
        <button type="submit">{isRegistering ? 'Зареєструватися' : 'Увійти'}</button>
      </form>

      <p onClick={() => setIsRegistering(!isRegistering)} className="switch-mode">
        {isRegistering ? 'Вже маєте акаунт? Увійти' : 'Немає акаунту? Зареєструватися'}
      </p>

      <hr />
      <button className="google-btn" onClick={handleGoogleLogin}>
        <span role="img" aria-label="Google">🌐</span> Увійти через Google
      </button>
    </div>
  );
}