import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { Popover } from "@headlessui/react";
import _ from "lodash";
import PopoverTransitionWrapper from "./popover-transition-wrapper";

// TODO: Duplicated
const ChevronRight = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`h-6 w-6 ${className}`}
    >
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  );
};

const HamburgerIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`h-[30px] w-[30px] md:h-[40px] md:w-[40px] ${className}`}
    >
      <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
    </svg>
  );
};

const CloseIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`h-[30px] w-[30px] md:h-[40px] md:w-[40px] ${className}`}
    >
      <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
    </svg>
  );
};

const NavLink = ({ link, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const hasChildLinks = link.children && link.children.length > 0;

  const handleOnMouseEnter = () => {
    console.log("Handling on mouse enter");
    if (hasChildLinks) setShowDropdown(true);
  };

  const handleOnMouseLeave = () => {
    if (hasChildLinks) setShowDropdown(false);
  };

  return (
    <div className={`group ${className}`}>
      <Popover>
        {() => (
          <>
            <div
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <Popover.Button className="flex focus:outline-none items-center select-none cursor-pointed px-2 py1 rounded transition duration-75 group-hover:bg-light-blue-100">
                <Link href={link.url}>
                  <a className="transition duration-75 text-dark-blue group-hover:text-dark-blue">
                    {link.title}
                  </a>
                </Link>
                {hasChildLinks && (
                  <ChevronRight
                    className={`group-hover:fill-lightest-blue group-hover:rotate-90 transition duration-75`}
                  />
                )}
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
};

const NavButton = ({ item, className }) => {
  return (
    <div className={`select-none cursor-pointer ${className}`}>
      <a
        className={classNames(
          "transition duration-75 p-3 text-dark-blue",
          {
            "rounded-full drop-shadow-md bg-light-blue-300 hover:bg-light-blue hover:text-dark-blue hover:drop-shadow-xl":
              item.applyAccent,
          },
          {
            "rounded-full hover:bg-light-blue-100 hover:text-dark-blue hover:drop-shadow-md":
              !item.applyAccent,
          }
        )}
      >
        {item.title}
      </a>
    </div>
  );
};

const DropdownItem = ({ item }) => {
  return (
    <div className="select-none cursor-pointer w-full text-center p-2 font-normal text-sm text-charcoal transition duration-75 hover:bg-gray-100">
      <span>{item.title}</span>
    </div>
  );
};

const Dropdown = ({ items }) => {
  return (
    <div
      id="dropdown"
      className={classNames(
        "w-60 absolute border p-2 border-light-blue-300 rounded-md drop-shadow-lg bg-white"
      )}
    >
      {items.map((item, index) => {
        return <DropdownItem key={`dropdown-item-${index}`} item={item} />;
      })}
    </div>
  );
};

const Nav = ({ isMobileDevice }) => {
  const linkItems = [
    {
      title: "Test Link",
      url: "/test-page",
      children: [],
      id: 0,
    },
    {
      title: "Another Link",
      url: "/test-page",
      children: [
        { title: "Test Page", url: "/test-page" },
        { title: "Another test page", url: "/test-page" },
      ],
      id: 1,
    },
    {
      title: "Link 3",
      url: "/test-page",
      children: [],
      id: 2,
    },
    {
      title: "Lorem Ipsum",
      url: "/test-page",
      children: [],
      id: 3,
    },
  ];

  const linkButtons = [
    {
      title: "Member sign-in",
      url: "/test-page",
      applyAccent: false,
    },
    {
      title: "Become A Member",
      url: "/test-page",
      applyAccent: true,
    },
  ];

  console.log("isMobileDevice: ", isMobileDevice);

  return (
    <nav>
      {isMobileDevice ? (
        <NavMobile linkItems={linkItems} linkButtons={linkButtons} />
      ) : (
        <NavDesktop linkItems={linkItems} linkButtons={linkButtons} />
      )}
    </nav>
  );
};

const MenuItem = ({ item, className }) => {
  return (
    <Link href={item.url}>
      <a className={`text-dark-blue text-lg ${className}`}>{item.title}</a>
    </Link>
  );
};

const MenuButton = ({ item, className }) => {
  return (
    <div className={`${className}`}>
      <a
        className={classNames(
          `p-3`,
          {
            "rounded-md drop-shadow-md bg-light-blue text-white":
              item.applyAccent,
          },
          {
            "rounded-md drop-shadow-md bg-light-blue-500 text-dark-blue":
              !item.applyAccent,
          }
        )}
      >
        {item.title}
      </a>
    </div>
  );
};

const Menu = ({ linkItems, linkButtons, handleMenuIconClicked, className }) => {
  return (
    // Note this root div's padding is meant to be similar to NavMobile component dimensions
    <div
      className={`Menu fixed left-0 top-0 w-full h-screen bg-light-blue-300 z-50 flex flex-col px-4 py-2 md:px-10 md:py-5 font-poppins ${className}`}
    >
      {/* Meant to imitate the NavMobile component dimensions closely */}
      <div
        className="h-14 w-full flex justify-end items-center"
        onClick={handleMenuIconClicked}
      >
        <CloseIcon className="fill-dark-blue" />
      </div>

      <div className="flex flex-grow flex-col justify-center items-center">
        {linkItems.map((item, index) => {
          return (
            <MenuItem
              className="mb-6 last:mb-0"
              key={`menu-item-${index}`}
              item={item}
            />
          );
        })}
      </div>
      <div className="flex flex-grow flex-col justify-center items-center">
        {linkButtons.map((item, index) => {
          return (
            <MenuButton
              key={`menu-button-${index}`}
              className="mb-12 last:mb-0"
              item={item}
            />
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

  // TODO: Prevent scroll when showMenu is true

  return (
    <>
      <div className="NavMobile flex flex-row justify-between items-center px-4 py-2 md:px-10 md:py-5">
        {/* TODO: Apply tailwind classes to make this resize properly? */}
        <Image src="/nzse-logo.svg" alt="nzse-logo" width={150} height={60} />
        <div onClick={handleMenuIconClicked}>
          <HamburgerIcon />
        </div>
      </div>
      {/* {showMenu && (
        <Menu
          linkItems={linkItems}
          linkButtons={linkButtons}
          handleMenuIconClicked={handleMenuIconClicked}
        />
      )} */}
      <Menu
        className={`${showMenu ? "menuFadeIn" : "menuFadeOut"}`}
        linkItems={linkItems}
        linkButtons={linkButtons}
        handleMenuIconClicked={handleMenuIconClicked}
      />
    </>
  );
};

const NavDesktop = ({ linkItems, linkButtons }) => {
  return (
    <div className="Nav h-24 w-full border-2 border-gray-200 flex justify-around items-center font-poppins font-medium">
      <div className="NavDesktop flex flex-row items-center">
        <div className="mr-14">
          <Image src="/nzse-logo.svg" alt="nzse-logo" width={180} height={60} />
        </div>
        <div className="flex flex-row justify-between">
          {linkItems.map((item, index) => {
            return (
              <NavLink
                key={`nav-link-${index}`}
                link={item}
                className="mr-4 last:mr-0"
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row w-1/3 justify-end">
        {linkButtons.map((item, index) => {
          return (
            <NavButton
              key={`nav-button-${index}`}
              item={item}
              className="mr-6 last:mr-0"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
