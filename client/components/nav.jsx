import { NavMobile, NavDesktop } from './';

const Nav = ({ isMobileDevice, navigationData }) => {
  const { navLinkItems, navButtons } = navigationData;
  return (
    <nav>
      {isMobileDevice ? (
        <NavMobile linkItems={navLinkItems} linkButtons={navButtons} />
      ) : (
        <NavDesktop linkItems={navLinkItems} linkButtons={navButtons} />
      )}
    </nav>
  );
};

export default Nav;
