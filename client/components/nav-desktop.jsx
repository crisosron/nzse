import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { Popover } from '@headlessui/react';
import _ from 'lodash';
import PopoverTransitionWrapper from './popover-transition-wrapper';
import { ChevronRightIcon, UserIcon } from './svg-components';
import { buildPageUrl, unwrapEntityResponse } from '../lib/utils';
import { useAuth } from '../lib/hooks/use-auth';

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

const NavButton = ({ className, onClick, children, applyAccent, href }) => {
  const renderButton = () => {
    return (
      <div
        className={classNames(
          `transition-colors duration-150 p-3 ${className}`,
          {
            'rounded text-white drop-shadow-md bg-light-blue hover:bg-lightest-blue hover:text-dark-blue hover:drop-shadow-xl transition-colors duration-75':
              applyAccent
          },
          {
            'rounded text-dark-blue hover:bg-light-blue-100 hover:text-dark-blue hover:drop-shadow-md':
              !applyAccent
          }
        )}
      >
        {children}
      </div>
    );
  };

  const renderLink = (href) => {
    return <Link href={href || '/'}>{renderButton()}</Link>;
  };

  return (
    <div className={`select-none cursor-pointer ${className}`} onClick={onClick}>
      {onClick ? renderButton() : renderLink(href)}
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

const UnAuthenticatedNavButtons = () => {
  return (
    <>
      <NavButton href='/login' className='mr-6 last:mr-0'>
        Member sign-in
      </NavButton>
      <NavButton href='/memberships' className='mr-6 last:mr-0' applyAccent>
        Become a member
      </NavButton>
    </>
  );
};

const AuthenticatedNavButtons = ({ authenticatedUser }) => {
  const { signOutUser } = useAuth();

  const { email } = authenticatedUser;
  const [signoutHovered, setSignoutHovered] = useState(false);
  return (
    <div
      className='group z-max'
      onMouseEnter={() => setSignoutHovered(true)}
      onMouseLeave={() => setSignoutHovered(false)}
    >
      <Popover>
        {() => {
          return (
            <>
              <NavButton className='group-hover:bg-light-blue-100'>
                <div className='flex justify-center items-center'>
                  <UserIcon className='mr-4 h-8 w-8 fill-dark-blue' />
                  {email}
                </div>
              </NavButton>
              <PopoverTransitionWrapper show={signoutHovered}>
                <Popover.Panel>
                  <div
                    className={classNames(
                      'w-full absolute border p-2 border-light-blue-300 rounded-md drop-shadow-lg bg-white'
                    )}
                  >
                    <div
                      className='select-none cursor-pointer w-full text-center p-2 font-normal text-sm transition duration-75 hover:bg-gray-100 z-max'
                      onClick={signOutUser}
                    >
                      Sign out
                    </div>
                  </div>
                </Popover.Panel>
              </PopoverTransitionWrapper>
            </>
          );
        }}
      </Popover>
    </div>
  );
};

const NavDesktop = ({ linkItems }) => {
  const { authenticatedUser } = useAuth();
  return (
    <div className='Nav h-24 w-full flex justify-around items-center font-poppins font-medium z-max'>
      <div className='NavDesktop flex flex-row items-center'>
        <div className='mr-14'>
          <Link href='/'>
            <a>
              <Image src='/nzse-logo.svg' alt='nzse-logo' width={180} height={60} />
            </a>
          </Link>
        </div>
        <div className='flex flex-row justify-between'>
          {linkItems.map((item, index) => {
            return <NavLink key={`nav-link-${index}`} link={item} className='mr-4 last:mr-0' />;
          })}
        </div>
      </div>
      <div className='flex flex-row w-1/3 justify-end'>
        {authenticatedUser ? (
          <AuthenticatedNavButtons authenticatedUser={authenticatedUser} />
        ) : (
          <UnAuthenticatedNavButtons />
        )}
      </div>
    </div>
  );
};

export default NavDesktop;
