import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { HamburgerIcon, CloseIcon, UserIcon } from './svg-components';
import { buildPageUrl, unwrapEntityResponse } from '../lib/utils';
import { useAuth } from '../lib/hooks/use-auth';

const MenuItem = ({ item, className }) => {
  const page = unwrapEntityResponse(item.page);

  const linkedPage = {
    title: page.title,
    url: buildPageUrl(page)
  };

  const renderLinkedItem = () => {
    return (
      <Link href={linkedPage.url}>
        <a className={`text-dark-blue text-lg md:text-h2 ${className}`}>
          {item.label || linkedPage.title}
        </a>
      </Link>
    );
  };

  const renderUnlinkedItem = () => {
    return (
      <a className={`text-dark-blue text-lg md:text-h2 ${className}`}>
        {item.label || linkedPage.title}
      </a>
    );
  };

  return linkedPage.url ? renderLinkedItem() : renderUnlinkedItem();
};

const MenuButton = ({ className, onClick, children, applyAccent, href }) => {
  const renderButton = () => {
    return (
      <a
        className={classNames(
          `block p-3 md:text-h2 capitalize ${className}`,
          {
            'rounded-md drop-shadow-md bg-light-blue text-white': applyAccent
          },
          {
            'rounded-md drop-shadow-md border-2 border-light-blue-500 bg-white bg-opacity-40 text-dark-blue':
              !applyAccent
          }
        )}
      >
        {children}
      </a>
    );
  };

  const renderLink = () => {
    return <Link href={href || '/'}>{renderButton()}</Link>;
  };

  return (
    <div className={`w-[60%] text-center ${className}`} onClick={onClick}>
      {onClick ? renderButton() : renderLink(href)}
    </div>
  );
};

const UnAuthenticatedMenuButtons = () => {
  return (
    <>
      <MenuButton href='/login' className='mb-12 last:mb-0'>
        <div className='flex justify-center items-center'>
          <UserIcon className='mr-2 fill-dark-blue' />
          Member Login
        </div>
      </MenuButton>
      <MenuButton href='/memberships' className='mb-12 last:mb-0' applyAccent>
        Become a member
      </MenuButton>
    </>
  );
};

const AuthenticatedMenuButtons = () => {
  const { signOutUser, authenticatedUser } = useAuth();
  return (
    <>
      <span className='mb-12 text-dark-blue'>{authenticatedUser.email}</span>
      <MenuButton onClick={signOutUser}>
        <div className='flex justify-center items-center'>Sign out</div>
      </MenuButton>
    </>
  );
};

const Menu = ({ linkItems, handleMenuIconClicked, className }) => {
  const { authenticatedUser } = useAuth();
  return (
    // Note this root div's padding is meant to be similar to NavMobile component dimensions
    <div
      className={`Menu z-max fixed left-0 top-0 w-full h-screen z-50 bg-white/95 backdrop-blur-md flex flex-col px-4 py-2 md:px-10 md:py-5 font-poppins ${className}`}
    >
      {/* Meant to imitate the NavMobile component dimensions closely */}
      <div className='h-14 w-full flex justify-end items-center'>
        <div onClick={handleMenuIconClicked}>
          <CloseIcon className='fill-dark-blue' />
        </div>
      </div>

      <div className='flex flex-grow flex-col justify-center items-center'>
        {linkItems.map((item, index) => {
          return <MenuItem className='mb-6 last:mb-0' key={`menu-item-${index}`} item={item} />;
        })}
      </div>
      <div className='flex flex-grow flex-col justify-center items-center'>
        {authenticatedUser ? <AuthenticatedMenuButtons /> : <UnAuthenticatedMenuButtons />}
      </div>
    </div>
  );
};

const NavMobile = ({ linkItems, linkButtons }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuIconClicked = () => {
    setShowMenu(!showMenu);
  };

  // Lock or unlock scroll when the menu is opened or closed respectively (and enable scroll on dismount)
  useEffect(() => {
    if (showMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => document.body.style.overflow = 'unset';
  }, [showMenu]);

  return (
    <>
      <div className='NavMobile border-b border-gray-200 flex flex-row justify-between items-center px-4 py-2 md:px-10 md:py-5 z-50'>
        <Link href='/'>
          <a>
            <Image src='/nzse-logo.svg' alt='nzse-logo' width={150} height={60} />
          </a>
        </Link>
        <div onClick={handleMenuIconClicked}>
          <HamburgerIcon />
        </div>
      </div>
      <Menu
        className={classNames(
          { menuFadeIn: showMenu },
          { menuFadeOut: !showMenu },
          { 'z-hide': !showMenu }
        )}
        linkItems={linkItems}
        linkButtons={linkButtons}
        handleMenuIconClicked={handleMenuIconClicked}
      />
    </>
  );
};

export default NavMobile;
