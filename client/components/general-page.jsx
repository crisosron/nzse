import { formatDate } from "../lib/utils";
import { Layout, Sidebar } from '.';
import { Blocks } from './blocks';
import { useRouter } from 'next/router'

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
  const router = useRouter();
  let sidebarTitle = router.pathname.split('/')[1]
  sidebarTitle = sidebarTitle.charAt(0).toUpperCase() + sidebarTitle.slice(1);
  
  return (
    <Layout>
      <div className="GeneralPage md:flex">
        <Sidebar className="hidden md:block" navBlocks={sidebarNavBlocks} title={sidebarTitle} />

        {/* 'prose' className required by tailwind to apply tailwindcss to CMSable rich text content */}
        <div className="content prose md:prose-lg lg:prose-lg lg:py-4 lg:mx-8 lg:max-w-full md:flex md:flex-col md:justify-center">
          <h1 className="mb-2">{ title }</h1>
          <span>{publishedDate}</span>
          <Blocks blocks={blocks} />
        </div>

        <Sidebar className="block my-5 md:hidden" navBlocks={sidebarNavBlocks} title={sidebarTitle} />
      </div>
    </Layout>
  );
};

export default GeneralPage;
