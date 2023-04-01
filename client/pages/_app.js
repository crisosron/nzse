import Head from 'next/head';
import { createContext } from 'react';
import { getStrapiMedia } from '../lib/media';
import { graphqlClient } from '../lib/graphql-api';
import {
  getGlobalAttributes,
  getGlobalSeo,
  getSidebar,
  getFooter,
  getNavigation
} from '../graphql/queries';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import { AuthProvider } from '../lib/hooks/use-auth';

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps: { session, ...pageProps} }) => {
  const { globalAttributes, globalSeo, seo } = pageProps;

  const seoWithDefaults = {
    ...globalSeo,
    ...seo
  };

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: seoWithDefaults.metaTitle || 'NZSE'
  };

  return (
    <>
      <Head>
        {globalAttributes.favicon.data && (
          <link rel='shortcut icon' href={getStrapiMedia(globalAttributes.favicon).url} />
        )}
        {fullSeo.metaTitle && (
          <>
            <title>{fullSeo.metaTitle}</title>
            <meta property='og:title' content={fullSeo.metaTitle} />
            <meta name='twitter:title' content={fullSeo.metaTitle} />
          </>
        )}
        {fullSeo.metaDescription && (
          <>
            <meta name='description' content={fullSeo.metaDescription} />
            <meta property='og:description' content={fullSeo.metaDescription} />
            <meta name='twitter:description' content={fullSeo.metaDescription} />
          </>
        )}
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <SessionProvider session={session}>
        <AuthProvider>
          <GlobalContext.Provider value={pageProps}>
            <Component {...pageProps} />
          </GlobalContext.Provider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
};

MyApp.getInitialProps = async (context) => {
  const { ctx: { res } } = context;
  const [
    { data: globalAttributesData },
    { data: globalSeoData },
    { data: sidebarData },
    { data: footerData },
    { data: navigationData }
  ] = await Promise.all([
    graphqlClient.query({ query: getGlobalAttributes }),
    graphqlClient.query({ query: getGlobalSeo }),
    graphqlClient.query({ query: getSidebar }),
    graphqlClient.query({ query: getFooter }),
    graphqlClient.query({ query: getNavigation })
  ]);

  const globalAttributes = globalAttributesData.global.data.attributes;
  const globalSeo = globalSeoData.globalSeo.data.attributes;
  const sidebar = sidebarData.sidebar.data?.attributes;
  const footer = footerData.footer.data?.attributes;
  const navigation = navigationData.navigation.data?.attributes;

  // Keep fresh for an 1 hour, but allow serving of stale content (and revalidate) up to a day
  // TODO: This causes a problem with authentication... because when the page is cached, the
  // getServerSideProps for the page is never called, and because getServerSideProps is where
  // the gating of the content takes place.... this means that the site can't consistently detect
  // the auth status of the end-user
  // res.setHeader(
  //   'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400'
  // );

  return {
    pageProps: {
      globalAttributes,
      globalSeo,
      sidebar,
      footer,
      navigation,
    }
  };
};

export default MyApp;
