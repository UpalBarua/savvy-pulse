import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth, googleAuth } from '../firebase/firebase.config';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleAuth);
  };

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).catch((error) => console.log(error));
  };

  const value = {
    user,
    signUp,
    logIn,
    logOut,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
