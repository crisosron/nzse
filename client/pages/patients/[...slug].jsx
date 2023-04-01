import { useEffect } from 'react';
import { GeneralPage } from '../../components';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]';
// import { useAuth } from '../../lib/hooks/use-auth';
import { buildGeneralPageSlugs, buildGeneralPageProps } from '../../lib/general-page-utils';
import { useAuth } from '../../lib/hooks/use-auth';

export const getStaticPaths = async () => {
  return {
    paths: await buildGeneralPageSlugs('Patients'),
    fallback: false // Return 404 if the path is not in slugs/paths
  };
};

export const getStaticProps = async (context) => {
  const { params, req, res } = context;
  // const session = await getServerSession(req, res, authOptions);
  const props = await buildGeneralPageProps(params, 'Patients');

  if (!props) {
    return {
      notFound: true
    };
  }

  // const { membersOnly } = props;

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

const PatientsGeneralPage = (props) => {
  const { sidebar } = props;
  const patientsSidebar = sidebar?.patientsSidebar;

  // const { data: session, status } = useSession();

  // const { setAuthenticatedUser } = useAuth();
  // console.log('PatientsGeneralpage session: ', session);
  // console.log('status: ', status);

  // useEffect(() => {
  //   console.log('In PatientsGeneralPage useEffect');
  //   console.log('PatientsGeneralpage session: ', session);
  //   console.log('status: ', status);
  // }, []);

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  // const { setAuthenticatedUser } = useAuth();
  // useEffect(() => {
  //   if(status === 'authenticated') setAuthenticatedUser({ email: session.user.email });
  // }, [status]);

  // if(status === 'authenticated') setAuthenticatedUser({ email: session.user.email });

  return <GeneralPage sidebarNavBlocks={patientsSidebar} {...props} />;
};

export default PatientsGeneralPage;
