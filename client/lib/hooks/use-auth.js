import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

/**
 * Fore more info on firebase authentication: https://firebase.google.com/docs/auth/web/start
 */

const AuthContext = createContext({
  user: null,
  registerUser: null,
  signInUser: null,
  signOutUser: null,
  authLoading: null,
  clearAuthError: null,
  setAuthError: null,
  authenticatedUser: null,
  setAuthenticatedUser: null,
  resetUserPassword: null
});

// Maps an error code returned by firebase to prose
// All error codes and what they mean: https://firebase.google.com/docs/auth/admin/errors
const FIREBASE_ERROR_CODE_TO_MESSAGE_MAPPING = {
  'auth/user-not-found': 'A user with that email address could not be found.'
};

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
          error: response.error,
          message: 'Something went wrong. Please try again later'
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
    signOut({ callbackUrl: '/' });
  };


  const resetUserPassword = (email) => {
    // Extra options added to the auth operation
    // https://firebase.google.com/docs/auth/web/passing-state-in-email-actions
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`, // Redirect the user to the login page when password has been reset on the firebase form
    };

    setAuthLoading(true);
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(firebaseAuth, email, actionCodeSettings).then(() => {
        resolve();

      }).catch((error) => {
        setAuthError({
          status: 500,
          error,
          message: FIREBASE_ERROR_CODE_TO_MESSAGE_MAPPING[error.code] || "Something went wrong. Please try again later."
        });
        reject();

      }).finally(() => {
        setAuthLoading(false);
      });
    });
  };

  const clearAuthError = () => {
    setAuthError(undefined);
  };

  const contextValue = {
    registerUser,
    signInUser,
    signOutUser,
    authLoading: authLoading,
    authError,
    clearAuthError,
    authenticatedUser,
    setAuthenticatedUser,
    resetUserPassword
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
