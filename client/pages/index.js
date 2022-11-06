import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { graphqlClient } from '../lib/graphql-api'
import { getAllGeneralPages, getHomepage } from '../graphql/queries';
import { Blocks } from "../components/blocks";

const Home = ({ homepage, generalPages }) => {
  const { globalAttributes: { siteName }, footer: footerData, navigation: navigationData } = useContext(GlobalContext);
  const { seo: homepageSeo, blocks: homepageBlocks } = homepage;
  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <Seo seo={homepageSeo}></Seo>
      <Blocks blocks={homepageBlocks} />
    </Layout>
  );
};

export async function getStaticProps() {
  const [ { data: generalPagesData }, { data: homepageData } ] = await Promise.all(
    [
      graphqlClient.query({ query: getAllGeneralPages }),
      graphqlClient.query({ query: getHomepage })
    ]
  );

  const homepage = homepageData.homepage.data?.attributes;
  const generalPages = generalPagesData.generalPages.data?.map((generalPage) => ({ ...generalPage.attributes }));

  return {
    props: {
      homepage,
      generalPages
    },
    revalidate: 10
  };
}

export default Home;