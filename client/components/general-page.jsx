import { formatDate } from "../lib/utils";
import { Layout } from '.';
import { Blocks } from './blocks';

const GeneralPage = ({
  title,
  slug,
  audience,
  membersOnly,
  landingPage,
  createdAt,
  publishedAt,
  blocks,
  sidebar
}) => {
  const publishedDate = formatDate(publishedAt);
  console.log('Sidebar in general page: ', sidebar);
  return (
    <Layout>
      <div className="prose md:mx-4 lg:py-4">
        <h1 className="mb-2">{ title }</h1>
        <span>{publishedDate}</span>
        <Blocks blocks={blocks} />
      </div>
    </Layout>
  );
};

export default GeneralPage;
