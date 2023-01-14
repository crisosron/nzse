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
});

export const AuthProvider = ({ children }) => {
  // const [user] = useAuthState(firebaseAuth);
  const [authLoading, setAuthLoading] = useState(null);
  const [authError, setAuthError] = useState(null);

  const router = useRouter();

  const registerUser = (email, password) => {
    // TODO: Register a user
  };

  // console.log('user: ', user);

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
      // Note that a successful signin attempt will mutate 'user' automatically thanks to useAuthState
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
    // user: {
    //   email: user?.email,
    //   uid: user?.uid
    // },
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
