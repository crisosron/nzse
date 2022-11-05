import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL || "http://strapi:1337/graphql";

const errorLink = onError(( { graphqlErrors, networkError }) => {
  if(graphqlErrors) console.error('graphqlErrors: ', graphqlErrors);
  if(networkError) console.error('networkError.result: ', networkError.result);
});

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL })
const link = ApolloLink.from([errorLink, httpLink]);

const graphqlClient = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
  link
});

export { graphqlClient }