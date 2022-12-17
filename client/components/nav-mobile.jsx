import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { HamburgerIcon, CloseIcon } from './svg-components';
import { buildPageUrl, unwrapEntityResponse } from '../lib/utils';

const MenuItem = ({ item, className }) => {
  const page = unwrapEntityResponse(item.page);

  const linkedPage = {
    title: page.title,
    url: buildPageUrl(page)
  };

  const renderLinkedItem = () => {
    return (
      <Link href={`/${linkedPage.url}`}>
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

const MenuButton = ({ item, className }) => {
  const page = unwrapEntityResponse(item.page);
  const linkedPage = {
    title: page.title,
    url: buildPageUrl(page)
  };

  return (
    <div className={`${className}`}>
      <Link href={`/${linkedPage.url}` || '/'}>
        <a
          className={classNames(
            `p-3 md:text-h2`,
            {
              'rounded-md drop-shadow-md bg-light-blue text-white': item.applyAccent
            },
            {
              'rounded-md drop-shadow-md bg-light-blue-500 text-dark-blue': !item.applyAccent
            }
          )}
        >
          {item.label}
        </a>
      </Link>
    </div>
  );
};

const Menu = ({ linkItems, linkButtons, handleMenuIconClicked, className }) => {
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
        {linkButtons.map((item, index) => {
          return (
            <MenuButton key={`menu-button-${index}`} className='mb-12 last:mb-0' item={item} />
          );
        })}
      </div>
    </div>
  );
};

const NavMobile = ({ linkItems, linkButtons }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuIconClicked = () => {
    setShowMenu(!showMenu);
  };

  // Lock or unlock scroll when the menu is opened or closed respectively
  useEffect(() => {
    if (showMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [showMenu]);

  return (
    <>
      <div className='NavMobile flex flex-row justify-between items-center px-4 py-2 md:px-10 md:py-5 z-50'>
        {/* TODO: Apply tailwind classes to make this resize properly? */}
        <Image src='/nzse-logo.svg' alt='nzse-logo' width={150} height={60} />
        <div onClick={handleMenuIconClicked}>
          <HamburgerIcon />
        </div>
      </div>
      <Menu
        className={classNames({ menuFadeIn: showMenu }, { menuFadeOut: !showMenu })}
        linkItems={linkItems}
        linkButtons={linkButtons}
        handleMenuIconClicked={handleMenuIconClicked}
      />
    </>
  );
};

export default NavMobile;
