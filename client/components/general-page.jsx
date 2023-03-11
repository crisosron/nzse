import { Layout, Sidebar } from '.';
import Seo from './seo';
import { Blocks } from './blocks';

const GeneralPage = ({
  type,
  blocks,
  sidebarNavBlocks,
  footer: footerData,
  navigation: navigationData,
  seo
}) => {
  let sidebarTitle = type.charAt(0).toUpperCase() + type.slice(1);

  if (sidebarTitle === 'Root') sidebarTitle = 'NZSE';

  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <Seo seo={seo} />
      <div className='GeneralPage flex'>
        <Sidebar className='hidden md:block' navBlocks={sidebarNavBlocks} title={sidebarTitle} />
        <div className='general-page-blocks mx-[23px] py-4 md:ml-9 md:mr-[9%] md:py-12 lg:ml-12 lg:mr-[15%] lg:py-12'>
          <Blocks blocks={blocks} noContainerSpacing />
          <Sidebar
            className='block my-5 md:hidden'
            navBlocks={sidebarNavBlocks}
            title={sidebarTitle}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GeneralPage;
