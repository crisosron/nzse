import { createContext, useContext, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signIn } from 'next-auth/react';

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
  authenticatedUser: null,
  setAuthenticatedUser: null
});

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const router = useRouter();

  const registerUser = (email, password) => {
    // TODO: Register a user
  };

  const signInUser = (email, password) => {
    setAuthLoading(true);

    // 'redirect: false' required to handle login error on this page: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
    // without this, next-auth will redirect to a default 'try again' login page
    signIn('credentials', { email, password, redirect: false }).then((response) => {
      if(response.error || response.status !== 200) {
        setAuthError({
          status: response.status,
          error: response.error
        });

        return;
      }
      router.push('/');
    })
      .catch((error) => {
        console.error('Got signin error: ', error);
        setAuthError(error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const signOutUser = () => {
    // TODO: Sign out the current user
  };

  const contextValue = {
    registerUser,
    signInUser,
    signOutUser,
    authLoading: authLoading,
    authError,
    authenticatedUser,
    setAuthenticatedUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
