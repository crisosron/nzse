import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { Popover } from '@headlessui/react';
import _ from 'lodash';
import PopoverTransitionWrapper from './popover-transition-wrapper';
import { ChevronRightIcon } from './svg-components';
import { buildPageUrl, unwrapEntityResponse } from '../lib/utils';

const NavLink = ({ link, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const hasChildLinks = link.childPages.data?.length > 0;
  const page = unwrapEntityResponse(link.page);

  const linkedPage = {
    title: page.title,
    url: buildPageUrl(page)
  };

  const handleOnMouseEnter = () => {
    if (hasChildLinks) setShowDropdown(true);
  };

  const handleOnMouseLeave = () => {
    if (hasChildLinks) setShowDropdown(false);
  };

  const renderUnlinkedItem = () => {
    return (
      <a className='transition duration-75 text-dark-blue group-hover:text-dark-blue'>
        {link.label}
      </a>
    );
  };

  const renderLinkedItem = () => {
    return (
      <Link href={linkedPage.url || '/'}>
        <a className='transition duration-75 text-dark-blue group-hover:text-dark-blue'>
          {link.label || linkedPage.title}
        </a>
      </Link>
    );
  };

  return (
    <div className={`group ${className} z-max`}>
      <Popover>
        {() => (
          <>
            <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
              <Popover.Button className='flex focus:outline-none items-center select-none cursor-pointed px-2 py1 rounded transition duration-75 group-hover:bg-light-blue-100'>
                {linkedPage.url ? renderLinkedItem() : renderUnlinkedItem()}
                {hasChildLinks && (
                  <ChevronRightIcon
                    className={`group-hover:fill-lightest-blue group-hover:rotate-90 transition duration-75`}
                  />
                )}
              </Popover.Button>
              <PopoverTransitionWrapper show={hasChildLinks && showDropdown}>
                <Popover.Panel>
                  <Dropdown items={link.childPages.data} />
                </Popover.Panel>
              </PopoverTransitionWrapper>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

const NavButton = ({ item, className }) => {
  const page = unwrapEntityResponse(item.page);
  const linkedPage = {
    title: page.title,
    url: buildPageUrl(page)
  };

  return (
    <div className={`select-none cursor-pointer ${className}`}>
      <Link href={linkedPage.url || '/'}>
        <a
          className={classNames(
            'transition duration-75 p-3 text-dark-blue',
            {
              'rounded-full drop-shadow-md bg-light-blue-300 hover:bg-light-blue hover:text-dark-blue hover:drop-shadow-xl':
                item.applyAccent
            },
            {
              'rounded-full hover:bg-light-blue-100 hover:text-dark-blue hover:drop-shadow-md':
                !item.applyAccent
            }
          )}
        >
          {item.label}
        </a>
      </Link>
    </div>
  );
};

const DropdownItem = ({ item }) => {
  const linkedPage = {
    title: item.attributes.title,
    url: buildPageUrl(item)
  };

  return (
    <div className='select-none cursor-pointer w-full text-center p-2 font-normal text-sm transition duration-75 hover:bg-gray-100'>
      <Link href={linkedPage.url || '/'}>
        {/* Override default link hover with charcoal (which effectively removes the hover transition) */}
        <a className='text-charcoal hover:text-charcoal'>{linkedPage.title}</a>
      </Link>
    </div>
  );
};

const Dropdown = ({ items }) => {
  return (
    <div
      id='dropdown'
      className={classNames(
        'Dropdown w-60 absolute border p-2 border-light-blue-300 rounded-md drop-shadow-lg bg-white'
      )}
    >
      {items.map((item, index) => {
        return <DropdownItem key={`dropdown-item-${index}`} item={item} />;
      })}
    </div>
  );
};

const NavDesktop = ({ linkItems, linkButtons }) => {
  return (
    <div className='Nav h-24 w-full flex justify-around items-center font-poppins font-medium z-max'>
      <div className='NavDesktop flex flex-row items-center'>
        <div className='mr-14'>
          <Image src='/nzse-logo.svg' alt='nzse-logo' width={180} height={60} />
        </div>
        <div className='flex flex-row justify-between'>
          {linkItems.map((item, index) => {
            return <NavLink key={`nav-link-${index}`} link={item} className='mr-4 last:mr-0' />;
          })}
        </div>
      </div>
      <div className='flex flex-row w-1/3 justify-end'>
        {linkButtons.map((item, index) => {
          return <NavButton key={`nav-button-${index}`} item={item} className='mr-6 last:mr-0' />;
        })}
      </div>
    </div>
  );
};

export default NavDesktop;
