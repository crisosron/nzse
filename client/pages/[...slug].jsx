import { GeneralPage } from '../components';
import { buildGeneralPageSlugs, buildGeneralPageProps } from '../lib/general-page-utils';

export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Root'),
    fallback: true
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const props = await buildGeneralPageProps(params, 'Root');

  if (!props) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...props,
    },

    revalidate: 60
  };
};

const RootGeneralPage = (props) => {
  const { sidebar } = props;
  const rootSidebar = sidebar?.rootSidebar;
  return <GeneralPage sidebarNavBlocks={rootSidebar} {...props} />;
};

export default RootGeneralPage;
