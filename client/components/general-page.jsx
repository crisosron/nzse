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
      <div className="GeneralPage md:flex">
        <Sidebar className="hidden md:block" navBlocks={sidebarNavBlocks} />

        {/* 'prose' className required by tailwind to apply tailwindcss to CMSable rich text content */}
        <div className="content prose md:prose-lg lg:prose-lg lg:py-4 lg:mx-8 lg:max-w-full md:flex md:flex-col md:justify-center">
          <h1 className="mb-2">{ title }</h1>
          <span>{publishedDate}</span>
          <Blocks blocks={blocks} />
        </div>

        <Sidebar className="block my-5 md:hidden" navBlocks={sidebarNavBlocks} />
      </div>
    </Layout>
  );
};

export default GeneralPage;
