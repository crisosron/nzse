import { createContext, useContext, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Fore more info on firebase authentication: https://firebase.google.com/docs/auth/web/start
 */

const AuthContext = createContext({
  user: null,
  registerUser: null,
  signInUser: null,
  signOutUser: null,
  authLoading: null,
  authError: null,
});

const formatUser = (firebaseAuthenticatedUser) => {
  return {
    email: firebaseAuthenticatedUser.email,
    uid: firebaseAuthenticatedUser.uid
  };
};

const formatAuthError = (firebaseAuthError) => {
  return {
    code: firebaseAuthError.code,
    message: firebaseAuthError.message
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(null);
  const [authError, setAuthError] = useState(null);

  const registerUser = (email, password) => {
    // TODO: Register a user
  };

  const signInUser = (email, password) => {
    setAuthLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        setUser(formatUser(userCredential));
      })
      .catch((error) => {
        console.error('Got signin error: ', error);
        setAuthError(formatAuthError(error));
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const signOutUser = () => {
    // TODO: Sign out the current user
  };

  const contextValue = {
    user,
    registerUser,
    signInUser,
    signOutUser,
    authLoading,
    authError
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
