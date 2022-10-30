import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon, HamburgerIcon, CloseIcon } from "./svg-components";

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
      <Menu
        className={`${showMenu ? "menuFadeIn" : "menuFadeOut"}`}
        linkItems={linkItems}
        linkButtons={linkButtons}
        handleMenuIconClicked={handleMenuIconClicked}
      />
    </>
  );
};

export default NavMobile;