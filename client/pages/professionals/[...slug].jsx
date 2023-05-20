import { GeneralPage } from '../../components';
import { buildGeneralPageSlugs, buildGeneralPageProps } from '../../lib/general-page-utils';

export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Professionals'),
    fallback: true
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const props = await buildGeneralPageProps(params, 'Professionals');

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

const ProfessionalsGeneralPage = (props) => {
  const { sidebar } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar;
  return <GeneralPage sidebarNavBlocks={professionalsSidebar} {...props} />;
};

export default ProfessionalsGeneralPage;
