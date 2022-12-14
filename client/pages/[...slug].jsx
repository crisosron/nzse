import { GeneralPage } from '../components';
import Error404 from './404';
import { buildGeneralPageSlugs, buildGeneralPageProps } from '../lib/general-page-utils';

// TODO: Should this apply only for non member-only pages? Because with member only pages, we need
// to do some client side checks to determine if the user is logged in or not?
export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Root'),
    fallback: false // Return 404 if the path is not in slugs/paths
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: await buildGeneralPageProps(params, 'Root'),
    revalidate: 60
  };
};

const RootGeneralPage = (props) => {
  const { membersOnly, user, sidebar } = props;
  const rootSidebar = sidebar?.rootSidebar;

  if (membersOnly && !user.loggedIn) {
    return <Error404 />;
  }

  return <GeneralPage sidebarNavBlocks={rootSidebar} {...props} />;
};

export default RootGeneralPage;
