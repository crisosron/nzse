import { useContext } from 'react';
import Layout from '../components/layout';
import { GlobalContext } from '../lib/contexts/global-context';
import { graphqlClient } from '../lib/graphql-api';
import { getHomepage } from '../graphql/queries';
import { Blocks } from '../components/blocks';

const Home = ({ homepage }) => {
  const {
    footer: footerData,
    navigation: navigationData
  } = useContext(GlobalContext);

  const { blocks: homepageBlocks } = homepage;
  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <Blocks blocks={homepageBlocks} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const [{ data: homepageData }] = await Promise.all([
    graphqlClient.query({ query: getHomepage })
  ]);

  const homepage = homepageData.homepage.data?.attributes;

  return {
    props: {
      homepage,
    },

    revalidate: 60
  };
};

export default Home;
