import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from 'classnames';
import { Popover } from '@headlessui/react'
import _ from "lodash";
import PopoverTransitionWrapper from "./popover-transition-wrapper";

const ChevronDown = ({ className }) => {
  return (
    // rotate-90 class is used because this is the ChevronRight component
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={`h-6 w-6 ${className}`}>
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  )
}

const NavLink = ({ link, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const hasChildLinks = link.children && link.children.length > 0

  const handleOnMouseEnter = () => { 
    console.log('Handling on mouse enter');
    if (hasChildLinks) setShowDropdown(true);
  }

  const handleOnMouseLeave = () => {
    if (hasChildLinks) setShowDropdown(false);
  }

  return (
    <div className={`group ${className}`}>
      <Popover>
        {() => (
          <>
            <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
              <Popover.Button className="flex focus:outline-none items-center select-none cursor-pointed px-2 py1 rounded transition duration-75 group-hover:bg-light-blue-100">
                <Link href={link.url}>
                  <a className="transition duration-75 text-dark-blue group-hover:text-dark-blue">{link.title}</a> 
                </Link>
                { hasChildLinks && <ChevronDown className={`group-hover:fill-lightest-blue group-hover:rotate-90 transition duration-75`} /> }
              </Popover.Button>
              <PopoverTransitionWrapper show={hasChildLinks && showDropdown}>
                <Popover.Panel>
                  <Dropdown items={link.children} />
                </Popover.Panel>
              </PopoverTransitionWrapper>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
}

const NavButton = (({ item, className }) => {
  return (
    <div className={`select-none cursor-pointer ${className}`}>
      <a 
        className={classNames( 
          'transition duration-75 p-3 text-dark-blue',
          { 'rounded-full drop-shadow-md bg-light-blue-300 hover:bg-light-blue hover:text-dark-blue hover:drop-shadow-xl': item.applyAccent },
          { 'rounded-full hover:bg-light-blue-100 hover:text-dark-blue hover:drop-shadow-md': !item.applyAccent }
        )}>{item.title}
      </a>
    </div>
  )
})

const DropdownItem = ({ item }) => { 
  return (
    <div className="select-none cursor-pointer w-full text-center p-2 font-normal text-sm text-charcoal transition duration-75 hover:bg-gray-100">
      <span>{item.title}</span>
    </div>
  );
}

const Dropdown = ({ items }) => {
  return (
    <div id="dropdown" className={classNames(
      "w-60 absolute border p-2 border-light-blue-300 rounded-md drop-shadow-lg bg-white"
    )}>
      {
        items.map((item, index) => { 
          return <DropdownItem key={`dropdown-item-${index}`} item={item} />
        })
      }
    </div>
  )
}

const Nav = () => {
  const linkItems = [
    {
      title: 'Test Link',
      url: '/test-page',
      children: [],
      id: 0
    },
    {
      title: 'Another Link',
      url: '/test-page',
      children: [
        { title: 'Test Page', url: '/test-page' },
        { title: 'Another test page', url: '/test-page' }
      ],
      id: 1
    },
    {
      title: 'Link 3',
      url: '/test-page',
      children: [],
      id: 2
    },
    {
      title: 'Lorem Ipsum',
      url: '/test-page',
      children: [],
      id: 3
    }
  ]

  const linkButtons = [
    {
      title: 'Member sign-in',
      url: '/test-page',
      applyAccent: false
    },
    {
      title: 'Become A Member',
      url: '/test-page',
      applyAccent: true
    }
  ]

  return (
    <nav className="Nav h-24 w-full border-2 border-gray-200 flex justify-around items-center font-poppins font-medium">
      <div className="flex flex-row items-center">
        <div className="mr-14">
          <Image src="/nzse-logo.svg" alt="nzse-logo" width={180} height={60} />
        </div>
        <div className="flex flex-row justify-between">
          {
            linkItems.map((item, index) => {
              return (
                <NavLink key={`nav-link-${index}`} link={item} className="mr-4 last:mr-0" />
              );
            })
          }
        </div>
      </div>
      <div className="flex flex-row w-1/3 justify-end">
        {
          linkButtons.map((item, index) => {
            return (
              <NavButton key={`nav-button-${index}`} item={item} className="mr-6 last:mr-0"/>
            )
          })
        }
      </div>
    </nav>
  );
};

export default Nav;