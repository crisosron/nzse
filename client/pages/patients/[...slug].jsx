// import { GeneralPage } from '../../components';
// import { buildGeneralPageSlugs, buildGeneralPageProps } from '../../lib/general-page-utils';

// export const getStaticPaths = async () => {
//   return {
//     paths: await buildGeneralPageSlugs('Patients'),
//     fallback: 'blocking'
//   };
// };

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const props = await buildGeneralPageProps(params, 'Patients');

//   if (!props) {
//     return {
//       notFound: true
//     };
//   }

//   return {
//     props: {
//       ...props,
//     },
//     revalidate: 60
//   };
// };

const PatientsGeneralPage = (props) => {
  // const { sidebar } = props;
  // const patientsSidebar = sidebar?.patientsSidebar;
  // return <GeneralPage sidebarNavBlocks={patientsSidebar} {...props} />;
  return (
    <div>Patients general page</div>
  );
};

export default PatientsGeneralPage;