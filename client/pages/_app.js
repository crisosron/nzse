import App from 'next/app';
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

import '../styles/globals.scss';

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { globalAttributes } = pageProps;
  const { title: pageTitle } = pageProps;

  return (
    <>
      <Head>
        {globalAttributes.favicon.data && (
          <link rel='shortcut icon' href={getStrapiMedia(globalAttributes.favicon).url} />
        )}
        <title>NZSE | {pageTitle}</title>
      </Head>
      <GlobalContext.Provider value={pageProps}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
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

  // TODO: Pending implementation of login mechanism
  const user = {
    loggedIn: true
  };

  return {
    ...appProps,
    pageProps: {
      globalAttributes,
      globalSeo,
      user,
      sidebar,
      footer,
      navigation
    }
  };
};

export default MyApp;
