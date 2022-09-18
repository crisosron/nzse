import { graphqlClient } from "../../lib/graphql-api";
import {
  buildGeneralPageBySlugAndAudienceQuery,
  buildGeneralPageSlugsByAudienceQuery
} from "../../graphql/queries";
import { unwrapCollectionEntityResponse } from "../../lib/utils";
import { GeneralPage } from "../../components";
import Error404 from "../404";

// TODO: Should this apply only for non member-only pages? Because with member only pages, we need
// to do some client side checks to determine if the user is logged in or not?
export const getStaticPaths = async () => {
  const slugQuery = buildGeneralPageSlugsByAudienceQuery('Professionals');
  const slugs = unwrapCollectionEntityResponse(
    await graphqlClient.query({ query: slugQuery }), 'generalPages'
  ).map(entry => `/professionals/${entry.slug}`);

  return {
    paths: slugs,
    fallback: false // Return 404 if the path is not in slugs/paths
  }
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const query = buildGeneralPageBySlugAndAudienceQuery(slug, 'Professionals');
  const queryResponse = await graphqlClient.query({ query });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');
  const generalPage = generalPages.length ? generalPages[0] : null;

  return {
    props: generalPage
  }
};

const ProfessionalsGeneralPage = (props) => {
  const { membersOnly, user, sidebar } = props;
  const professionalsSidebar = sidebar?.professionalsSidebar

  if(membersOnly && !user.loggedIn) {
    return <Error404 />
  }

  return (
    <GeneralPage { ...props } sidebarNavBlocks={ professionalsSidebar } />
  );
};

export default ProfessionalsGeneralPage;
