import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const CompletedContext = createContext();

export function CompletedProvider({ children }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchCompletedLessons = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCompleted(data.completedLessons || []);
          } else {
            console.log('User document does not exist, initializing empty completedLessons');
            await setDoc(userDocRef, { completedLessons: [] }, { merge: true });
            setCompleted([]);
          }
        } catch (error) {
          console.error('Error fetching completed lessons:', error);
        }
      };
      fetchCompletedLessons();
    } else {
      setCompleted([]);
    }
  }, [user]);

  const updateCompletedLessons = async (newCompleted) => {
    console.log('Updating completed lessons with:', newCompleted);
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { completedLessons: newCompleted }, { merge: true });
        setCompleted(newCompleted);
        console.log('Successfully updated completed lessons in Firestore');
      } catch (error) {
        console.error('Error updating completed lessons:', error);
      }
    } else {
      console.log('No user authenticated, update skipped');
    }
  };

  return (
    <CompletedContext.Provider value={{ completed, setCompleted: updateCompletedLessons }}>
      {children}
    </CompletedContext.Provider>
  );
}