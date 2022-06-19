import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL || "http://strapi:1337/graphql",
  cache: new InMemoryCache()
});

export { graphqlClient }