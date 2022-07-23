import { graphqlClient } from "../../lib/graphql-api";
import { buildGeneralPageBySlugQuery } from "../../graphql/queries";
import { unwrapCollectionEntityResponse } from "../../lib/utils";

export const getStaticPaths = async () => {
  return {
    paths: ["/test"],
    fallback: "blocking"
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