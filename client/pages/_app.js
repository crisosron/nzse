import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { graphqlClient } from '../lib/graphql-api'
import { getGlobalAttributes } from '../graphql/queries';

import "../styles/globals.css";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { globalAttributes } = pageProps;

  return (
    <>
      <Head>
        { globalAttributes.favicon &&
          <link
          rel="shortcut icon"
          href={ getStrapiMedia(globalAttributes.favicon) }
          />
        }
      </Head>
      <GlobalContext.Provider value={{ globalAttributes }}>
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

  const { data: globalAttributesData } = await graphqlClient.query({ query: getGlobalAttributes });
  const globalAttributes = globalAttributesData.global.data.attributes;

  return {
    ...appProps,
    pageProps: {
      globalAttributes,
    }
  }
};

export default MyApp;