import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Articles from "../components/articles";
import { fetchAPI } from "../lib/api";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { graphqlClient } from '../lib/graphql-api'
import { getAllArticles, getHomepage } from '../graphql/queries';
import { Blocks } from "../components/blocks";


const Home = ({ homepage, articles }) => {
  const { globalAttributes: { siteName } } = useContext(GlobalContext);
  const { seo: homepageSeo, blocks: homepageBlocks } = homepage;
  return (
    <Layout>
      <Seo seo={homepageSeo}></Seo>
      <Blocks blocks={homepageBlocks} />
    </Layout>
  );
};

export async function getStaticProps() {

  const [ { data: articlesData }, { data: homepageData } ] = await Promise.all(
    [
      graphqlClient.query({ query: getAllArticles }),
      graphqlClient.query({ query: getHomepage })
    ]
  );
  const articles = articlesData.articles.data?.map((article) => ({ ...article.attributes }));
  const homepage = homepageData.homepage.data?.attributes

  return {
    props: {
      homepage,
      articles
    },
    revalidate: 1
  };
}

export default Home;