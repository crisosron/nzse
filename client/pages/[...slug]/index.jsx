import { graphqlClient } from "../../lib/graphql-api";
import { buildGeneralPageBySlugQuery, getAllGeneralPageSlugs } from "../../graphql/queries";
import { unwrapCollectionEntityResponse } from "../../lib/utils";

export const getStaticPaths = async () => {
  const slugs = unwrapCollectionEntityResponse(
    await graphqlClient.query({ query: getAllGeneralPageSlugs }), 'generalPages'
  ).map(entry => `/${entry.slug}`);

  return {
    paths: slugs,
    fallback: false // Return 404 if the path is not in slugs/paths
  }
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const generalPageBySlugQuery = buildGeneralPageBySlugQuery(slug);

  const queryResponse = await graphqlClient.query({ query: generalPageBySlugQuery });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');

  // TODO: need to redirect to 404 if generalPage is null
  const generalPage = generalPages.length ? generalPages[0] : null;

  return {
    props: generalPage
  }

};

const GeneralPage = ({
  title,
  slug,
  audience,
  membersOnly,
  landingPage,
  createdAt,
  publishedAt,
  image,
  blocks
}) => {
  return (
    <div>
      { title }
    </div>
  );

};

export default GeneralPage;