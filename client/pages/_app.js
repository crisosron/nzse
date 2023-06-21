import Head from 'next/head';
import { getStrapiMedia } from '../lib/media';
import { graphqlClientURQL } from '../lib/graphql-api';
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
import { GlobalContextProvider } from '../lib/contexts/global-context';

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
          <GlobalContextProvider pageProps={pageProps}>
            <Component {...pageProps} />
          </GlobalContextProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
};

MyApp.getInitialProps = async () => {
  const [
    { data: globalAttributesData },
    { data: globalSeoData },
    { data: sidebarData },
    { data: footerData },
    { data: navigationData }
  ] = await Promise.all([
    // graphqlClient.query({ query: getGlobalAttributes }),
    // graphqlClient.query({ query: getGlobalSeo }),
    // graphqlClient.query({ query: getSidebar }),
    // graphqlClient.query({ query: getFooter }),
    // graphqlClient.query({ query: getNavigation })
    graphqlClientURQL.query(getGlobalAttributes).toPromise(),
    graphqlClientURQL.query(getGlobalSeo).toPromise(),
    graphqlClientURQL.query(getSidebar).toPromise(),
    graphqlClientURQL.query(getFooter).toPromise(),
    graphqlClientURQL.query(getNavigation).toPromise()
  ]);

  const globalAttributes = globalAttributesData.global.data.attributes;
  const globalSeo = globalSeoData.globalSeo.data.attributes;
  const sidebar = sidebarData.sidebar.data?.attributes;
  const footer = footerData.footer.data?.attributes;
  const navigation = navigationData.navigation.data?.attributes;

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
