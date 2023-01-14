import { buildGeneralPageProps } from '../../lib/general-page-utils';
import { GeneralPage } from '../../components';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

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
    props
  };
};

const ProfessionalsGeneralPage = (props) => {
  const { sidebar } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar;

  return <GeneralPage sidebarNavBlocks={professionalsSidebar} {...props} />;
};

export default ProfessionalsGeneralPage;
