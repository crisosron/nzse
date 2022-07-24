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
