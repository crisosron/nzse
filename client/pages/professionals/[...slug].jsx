import { buildGeneralPageSlugs, buildGeneralPageProps } from '../../lib/general-page-utils';
import { GeneralPage } from '../../components';
import Error404 from '../404';

// TODO: Should this apply only for non member-only pages? Because with member only pages, we need
// to do some client side checks to determine if the user is logged in or not?
export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Professionals'),
    fallback: false // Return 404 if the path is not in slugs/paths
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: await buildGeneralPageProps(params, 'Professionals'),
    revalidate: 60
  };
};

const ProfessionalsGeneralPage = (props) => {
  const { membersOnly, user, sidebar } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar;

  if (membersOnly && !user.loggedIn) {
    return <Error404 {...props} />;
  }

  return <GeneralPage sidebarNavBlocks={professionalsSidebar} {...props} />;
};

export default ProfessionalsGeneralPage;
