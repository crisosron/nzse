import { useEffect, useContext } from 'react';
import Layout from '../components/layout';
import { GlobalContext } from '../pages/_app';
import { graphqlClient } from '../lib/graphql-api';
import { getHomepage } from '../graphql/queries';
import { Blocks } from '../components/blocks';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useAuth } from '../lib/hooks/use-auth';

const Home = ({ homepage, authenticatedUser }) => {

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  const { setAuthenticatedUser } = useAuth();
  useEffect(() => {
    setAuthenticatedUser(authenticatedUser);
  }, []);

  const {
    footer: footerData,
    navigation: navigationData
  } = useContext(GlobalContext);

  const { blocks: homepageBlocks } = homepage;
  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <Blocks blocks={homepageBlocks} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  const [{ data: homepageData }] = await Promise.all([
    graphqlClient.query({ query: getHomepage })
  ]);

  const homepage = homepageData.homepage.data?.attributes;

  return {
    props: {
      homepage,
      authenticatedUser: session ? { email: session.user.email } : null
    }
  };
};

export default Home;
