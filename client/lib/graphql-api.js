import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { Client, cacheExchange, fetchExchange } from 'urql';
// import { retryExchange } from '@urql/exchange-retry';

const GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL || 'http://strapi:1337/graphql';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    console.error('graphqlErrors: ', graphqlErrors);
    console.log('Graphql Error Details');
    graphqlErrors.forEach((error) => {
      console.log('message: ', error.message);
      console.log('extensions: ', error.extensions);
    });
  }
  if (networkError) console.error('networkError: ', networkError);
});

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });
const link = ApolloLink.from([errorLink, httpLink]);

const graphqlClient = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    // This is a looser cache policy than the default so that the apollo cache doesn't block Next.js 
    // on-demand revalidation (as in, apollo will NOT continue to serve cached content when
    // on-demand revalidation has taken place)
    query: {
      fetchPolicy: 'network-only'
    }
  },
  link
});

// const options = {
//   initialDelayMs: 1000,
//   maxDelayMs: 15000,
//   randomDelay: true,
//   maxNumberAttempts: 2,
//   retryIf: err => err && err.networkError,
// };

// const graphqlClientURQL = new Client({
//   url: GRAPHQL_API_URL,
//   exchanges: [cacheExchange, retryExchange(options), fetchExchange]
// });

export { graphqlClient };
