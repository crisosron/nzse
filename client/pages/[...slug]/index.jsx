import { graphqlClient } from "../../lib/graphql-api";
import { buildGeneralPageBySlugQuery, getAllGeneralPageSlugs } from "../../graphql/queries";
import { formatDate, unwrapCollectionEntityResponse } from "../../lib/utils";

import Layout from "../../components/layout";
import { Blocks } from "../../components/blocks";

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