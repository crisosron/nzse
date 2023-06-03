import { Layout, Sidebar } from '.';
import { Blocks } from './blocks';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Link from 'next/link';
import { PAGE_LINKS } from '../lib/constants';

const GeneralPage = ({
  type,
  blocks,
  sidebarNavBlocks,
  footer: footerData,
  navigation: navigationData,
  membersOnly
}) => {
  let sidebarTitle = type.charAt(0).toUpperCase() + type.slice(1);

  if (sidebarTitle === 'Root') sidebarTitle = 'NZSE';
  const { status } = useSession();
  const [authStatusResolved, setAuthStatusResolved] = useState(false);


  const renderLoadingState = () => {
    return (
      <span className='block'>
        <TailSpin
          height='28'
          width='28'
          color='#4cbedb'
          ariaLabel='tail-spin-loading'
          radius='1'
          visible={true}
        />
      </span>
    );
  };

  const renderBlocks = () => {
    return <Blocks blocks={blocks} noContainerSpacing />; 
  };

  const renderUnAuthenticatedContent = () => {
    return (
      <div>
        <p className="mb-10">
          You need to be a member of NZSE to view this content. Click <Link href={PAGE_LINKS.MEMBERSHIP_INFO}>here</Link> to learn more about our memberships.
        </p>

        <p>
          If you are already a member, you need to be <Link href="/login">logged in</Link> to view this content.
        </p>
      </div>
    );
  };

  const renderContent = () => {
    if(membersOnly && status === 'loading') return renderLoadingState();
    else if(membersOnly && authStatusResolved && status === 'unauthenticated') return renderUnAuthenticatedContent();
    return renderBlocks();
  };

  useEffect(() => {
    setAuthStatusResolved(true);
  }, [status]);

  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <div className='GeneralPage flex'>
        <Sidebar className='hidden md:block' navBlocks={sidebarNavBlocks} title={sidebarTitle} />
        {/*
          To set the minimum height such that the content container fills the page, whilst making
          sure the footer remains visbile in the viewport:  
          md:min-h calc: 13rem (h-52) = footer height, 6rem (h-24): nav height
        */}
        <div className='general-page-blocks md:min-h-[calc(100vh-13rem-6rem)] w-full mx-[23px] py-4 md:ml-9 md:mr-[9%] md:py-12 lg:ml-12 lg:mr-[15%] lg:py-12'>
          { renderContent() }
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
