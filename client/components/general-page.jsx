import { formatDate } from "../lib/utils";
import { Layout, Sidebar } from ".";
import { Blocks } from "./blocks";
import Container from "./container";

const GeneralPage = ({
  title,
  slug,
  type,
  membersOnly,
  landingPage,
  createdAt,
  publishedAt,
  blocks,
  sidebarNavBlocks,
  footer: footerData,
  navigation: navigationData,
}) => {
  const publishedDate = formatDate(publishedAt);
  let sidebarTitle = type.charAt(0).toUpperCase() + type.slice(1);

  if (sidebarTitle === "Root") sidebarTitle = "NZSE";

  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <div className="GeneralPage flex">
        <Sidebar
          className="hidden md:block"
          navBlocks={sidebarNavBlocks}
          title={sidebarTitle}
        />

        {/* 'prose' className required by tailwind to apply tailwindcss to CMSable rich text content */}
        {/* <div className="content prose md:prose-md md:px-8 lg:prose-lg lg:p-4 lg:mx-8 lg:max-w-full md:flex md:flex-col md:justify-center">
          <h1 className="mb-2">{title}</h1>
          <span>{publishedDate}</span>
          <Blocks blocks={blocks} />
        </div> */}
        {/* <Container>
          <div classNam="content prose md:prose-md md:px-8 lg:prose-lg lg:p-4 lg:mx-8 lg:max-w-full md:flex md:flex-col md:justify-center">
            <h1 className="mb-2">{title}</h1>
          </div>
        </Container> */}
        <div className="flex-colgeneral-page-blocks">
          <div className="">
            <Blocks blocks={blocks} />

          </div>
        </div>

        <Sidebar
          className="block my-5 md:hidden"
          navBlocks={sidebarNavBlocks}
          title={sidebarTitle}
        />
      </div>
    </Layout>
  );
};

export default GeneralPage;
