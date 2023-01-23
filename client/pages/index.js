import React, { useEffect } from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { useContext } from 'react';
import { GlobalContext } from '../pages/_app';
import { graphqlClient } from '../lib/graphql-api';
import { getAllGeneralPages, getHomepage } from '../graphql/queries';
import { Blocks } from '../components/blocks';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useAuth } from '../lib/hooks/use-auth';

const Home = ({ homepage, generalPages, authenticatedUser }) => {

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  const { setAuthenticatedUser } = useAuth();
  useEffect(() => {
    setAuthenticatedUser(authenticatedUser);
  }, []);

  const {
    globalAttributes: { siteName },
    footer: footerData,
    navigation: navigationData
  } = useContext(GlobalContext);
  const { seo: homepageSeo, blocks: homepageBlocks } = homepage;
  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <Seo seo={homepageSeo}></Seo>
      <Blocks blocks={homepageBlocks} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  const [{ data: generalPagesData }, { data: homepageData }] = await Promise.all([
    graphqlClient.query({ query: getAllGeneralPages }),
    graphqlClient.query({ query: getHomepage })
  ]);

  const homepage = homepageData.homepage.data?.attributes;
  const generalPages = generalPagesData.generalPages.data?.map((generalPage) => ({
    ...generalPage.attributes
  }));

  return {
    props: {
      homepage,
      generalPages,
      authenticatedUser: session ? { email: session.user.email } : null
    }
  };
};

export default Home;
