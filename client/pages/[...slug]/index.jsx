import { graphqlClient } from "../../lib/graphql-api";
import { buildGeneralPageBySlugQuery, getAllGeneralPageSlugs } from "../../graphql/queries";
import { formatDate, unwrapCollectionEntityResponse } from "../../lib/utils";

import Layout from "../../components/layout";
import { Blocks } from "../../components/blocks";

// TODO: Should this apply only for non member-only pages? Because with member only pages, we need
// to do some client side checks to determine if the user is logged in or not?
export const getStaticPaths = async () => {
  const slugs = unwrapCollectionEntityResponse(
    await graphqlClient.query({ query: getAllGeneralPageSlugs }), 'generalPages'
  ).map(entry => `/${entry.slug}`);

  return {
    paths: slugs,
    fallback: false // Return 404 if the path is not in slugs/paths
  }
};

// TODO: How to do logged in check for member only pages? Ideally we return a 404 here at some point
// If not possible here in getStaticProps, resort to doing the check in the client side (where the
// component code is below), and render the error page manually.
export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const generalPageBySlugQuery = buildGeneralPageBySlugQuery(slug);
  const queryResponse = await graphqlClient.query({ query: generalPageBySlugQuery });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');
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
  blocks
}) => {
  const publishedDate = formatDate(publishedAt);
  return (
    <Layout>
      <div className="prose">
        <h1 className="mb-2">{ title }</h1>
        <span>{publishedDate}</span>
        <Blocks blocks={blocks} />
      </div>
    </Layout>
  );

};

export default GeneralPage;