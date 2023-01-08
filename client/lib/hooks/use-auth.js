import { createContext, useContext, useState } from 'react';
import { firebaseAuth } from '../firebase';

/**
 * Fore more info on firebase authentication: https://firebase.google.com/docs/auth/web/start
 */

const AuthContext = createContext({
  user: null,
  registerUser: null,
  signInUser: null,
  signOutUser: null
});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const registerUser = (email, password) => {
    // TODO: Register a user
  };

  const signInUser = (email, password) => {
    // TODO: Sign in a user
  };

  const signOutUser = () => {
    // TODO: Sign out the current user
  };

  const contextValue = {
    user,
    registerUser,
    signInUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
