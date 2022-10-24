import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from 'classnames';

const ChevronDown = ({ className }) => {
  return (
    // rotate-90 class is used because this is the ChevronRight component
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={`rotate-90 h-6 w-6 ${className}`}>
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  )
}

const NavLink = ({ link, className }) => {
  return (
    <div className={`group ${className}`}>
      <div className="flex items-center select-none cursor-pointer px-2 py-1 rounded transition duration-75 group-hover:bg-light-blue-100">
        <Link href={link.url}>
          <a className="transition duration-75 text-dark-blue group-hover:text-dark-blue">{link.title}</a> 
        </Link>
        { link.children && link.children.length > 0 && <ChevronDown className={`group-hover:fill-lightest-blue transition duration-75`} /> }
      </div>
    </div>
  );
}

const NavButton = (({ item }) => {
  return (
    <div className="select-none cursor-pointer">
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

const Nav = () => {
  const linkItems = [
    {
      title: 'Test Link',
      url: '/test-page',
      children: []
    },
    {
      title: 'Another Link',
      url: '/test-page',
      children: [
        { title: 'Test Page', url: '/test-page' },
        { title: 'Another test page', url: '/test-page' }
      ]
    },
    {
      title: 'Link 3',
      url: '/test-page',
      children: []
    },
    {
      title: 'Lorem Ipsum',
      url: '/test-page',
      children: []
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
    <nav className="Nav h-24 w-full border-2 border-gray-200 flex justify-around items-center font-sansation">
      <div className="flex flex-row items-center">
        <div className="mr-14">
          <Image src="/nzse-logo.svg" alt="nzse-logo" width={180} height={60} />
        </div>
        <div className="flex flex-row justify-between font-semibold">
          {
            linkItems.map((item, index) => {
              return (
                <NavLink key={`nav-link-${index}`} link={item} className="mr-4 last:mr-0" />
              );
            })
          }
        </div>
      </div>
      <div className="flex flex-row justify-between w-1/6 font-semibold">
        {
          linkButtons.map((item, index) => {
            return (
              <NavButton key={`nav-button-${index}`} item={item} />
            )
          })
        }
      </div>
    </nav>
  );
};

export default Nav;