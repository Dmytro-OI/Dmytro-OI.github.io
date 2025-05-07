import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserProfile.css';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
      } else {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              email: user.email,
              displayName: user.displayName || 'Користувач',
              uid: user.uid,
              age: null,
            });
          }
        } catch (error) {
          console.error('Помилка при завантаженні даних:', error);
          setUserData({
            email: user.email,
            displayName: user.displayName || 'Користувач',
            uid: user.uid,
            age: null,
          });
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      console.log('Спроба виходу');
      await auth.signOut();
      console.log('Вихід успішний, показуємо сповіщення');
      toast.success('Ви успішно вийшли з акаунта!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      console.log('Помилка при виході:', error.message);
      toast.error('Помилка при виході. Спробуйте ще раз.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="user-profile">
      {userData ? (
        <div className="profile-card">
          <div className="profile-info">
            <h2>{userData.displayName}</h2>
            <p><i className="fas fa-envelope"></i> {userData.email}</p>
            {userData.age && <p><i className="fas fa-birthday-cake"></i> {userData.age}</p>}
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Вийти
            </button>
          </div>
        </div>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </div>
  );
}