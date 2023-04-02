import { useEffect, createContext } from "react";

import { useSession } from "next-auth/react";
import { useAuth } from "../hooks/use-auth";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children, pageProps }) => {
  const { data: session, status } = useSession();
  const { setAuthenticatedUser, authenticatedUser } = useAuth();

  useEffect(() => {
    if(status === 'authenticated' && !authenticatedUser) setAuthenticatedUser({ email: session.user.email });
  });

  return (
    <GlobalContext.Provider value={pageProps}>
      { children }
    </GlobalContext.Provider>
  );
};