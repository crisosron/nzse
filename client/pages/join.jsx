import { JoinPage, Layout } from '../components';
import { useEffect } from 'react';

import Seo from '../components/seo';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useAuth } from '../lib/hooks/use-auth';

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: {
      authenticatedUser: session ? { email: session.user.email } : null
    }
  };
};

const Join = (props) => {
  const { footer: footerData, navigation: navigationData, authenticatedUser } = props;

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  const { setAuthenticatedUser } = useAuth();
  useEffect(() => {
    setAuthenticatedUser(authenticatedUser);
  }, []);

  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      {/* TODO: Make join-page specific seo data fields in global seo? (for each stand alone page as well) */}
      <Seo />
      <JoinPage />
    </Layout>
  );
};

export default Join;
