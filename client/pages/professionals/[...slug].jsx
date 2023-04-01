// import { useEffect } from 'react';
import { GeneralPage } from '../../components';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]';
// import { useAuth } from '../../lib/hooks/use-auth';

import { buildGeneralPageSlugs, buildGeneralPageProps } from '../../lib/general-page-utils';

export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Professionals'),
    fallback: false // Return 404 if the path is not in slugs/paths
  };
};

export const getStaticProps = async (context) => {
  const { params, req, res } = context;

  // const session = await getServerSession(req, res, authOptions);
  const props = await buildGeneralPageProps(params, 'Professionals');

  if (!props) {
    return {
      notFound: true
    };
  }

  const { membersOnly } = props;

  // Redirect to login page if not signed in and the page is marked as members only
  // if (membersOnly && !session) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }

  return {
    props: {
      ...props,
      // authenticatedUser: session ? { email: session.user.email } : null
    },
    revalidate: 60
  };
};

const ProfessionalsGeneralPage = (props) => {
  const { sidebar, authenticatedUser } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar;

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  // const { setAuthenticatedUser } = useAuth();
  // useEffect(() => {
  //   setAuthenticatedUser(authenticatedUser);
  // }, []);

  return <GeneralPage sidebarNavBlocks={professionalsSidebar} {...props} />;
};

export default ProfessionalsGeneralPage;
