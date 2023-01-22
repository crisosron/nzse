import { useEffect } from 'react';
import { buildGeneralPageProps } from '../../lib/general-page-utils';
import { GeneralPage } from '../../components';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useAuth } from '../../lib/hooks/use-auth';

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  const session = await unstable_getServerSession(req, res, authOptions);
  const props = await buildGeneralPageProps(params, 'Professionals');
  const { membersOnly } = props;

  // Redirect to login page if not signed in and the page is marked as members only
  if (membersOnly && !session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      ...props,
      authenticatedUser: session ? { email: session.user.email } : null
    }
  };
};

const ProfessionalsGeneralPage = (props) => {
  const { sidebar, authenticatedUser } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar;

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  const { setAuthenticatedUser } = useAuth();
  useEffect(() => {
    setAuthenticatedUser(authenticatedUser);
  }, []);

  return <GeneralPage sidebarNavBlocks={professionalsSidebar} {...props} />;
};

export default ProfessionalsGeneralPage;
