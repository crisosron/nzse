import { formatDate } from "../lib/utils";
import { Layout, Sidebar } from '.';
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
  sidebarNavBlocks
}) => {
  const publishedDate = formatDate(publishedAt);
  return (
    <Layout>
      <div className="flex">
        <Sidebar navBlocks={sidebarNavBlocks} />

        {/* 'prose' className required by tailwind to apply tailwindcss to CMSable rich text content */}
        <div className="prose md:prose-lg lg:prose-lg lg:py-4 lg:mx-8 lg:max-w-full">
          <h1 className="mb-2">{ title }</h1>
          <span>{publishedDate}</span>
          <Blocks blocks={blocks} />
        </div>
      </div>
    </Layout>
  );
};

export default GeneralPage;
