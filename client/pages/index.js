// import { useContext } from 'react';
// import Layout from '../components/layout';
// import { GlobalContext } from '../lib/contexts/global-context';
// import { graphqlClientURQL } from '../lib/graphql-api';
// import { getHomepage } from '../graphql/queries';
// import { Blocks } from '../components/blocks';

// const Home = ({ homepage }) => {
//   const {
//     footer: footerData,
//     navigation: navigationData
//   } = useContext(GlobalContext);

//   const { blocks: homepageBlocks } = homepage;
//   return (
//     <Layout footerData={footerData} navigationData={navigationData}>
//       <Blocks blocks={homepageBlocks} />
//     </Layout>
//   );
// };

const Home = () => {
  return (
    <div>Homepage</div>
  );
};

export const getStaticProps = async () => {
  // const [{ data: homepageData }] = await Promise.all([
  //   graphqlClient.query({ query: getHomepage })
  // ]);
  // const [{ data: homepageData }] = await Promise.all([
  //   graphqlClientURQL.query(getHomepage).toPromise()
  // ]);

  // console.log('homepageData: ', homepageData);

  // const homepage = homepageData.homepage.data?.attributes;

  // return {
  //   props: {
  //     homepage,
  //   },

  //   revalidate: 60
  // };

  return {
    props: {}
  };
};

export default Home;
