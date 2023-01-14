import { createContext, useContext, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const [user] = useAuthState(firebaseAuth);
  const [authLoading, setAuthLoading] = useState(null);
  const [authError, setAuthError] = useState(null);

  const router = useRouter();

  const registerUser = (email, password) => {
    // TODO: Register a user
  };

  const signInUser = (email, password) => {
    setAuthLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        // Note that a successful signin attempt will mutate 'user' automatically thanks to useAuthState
        router.push('/');
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
    user: {
      email: user?.email,
      uid: user?.uid
    },
    registerUser,
    signInUser,
    signOutUser,
    authLoading: authLoading,
    authError
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
