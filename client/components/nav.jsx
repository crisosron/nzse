import { NavMobile, NavDesktop } from './';

const Nav = ({ isMobileDevice, navigationData }) => {
  const { navLinkItems } = navigationData;
  return (
    <nav>
      {isMobileDevice ? (
        <NavMobile linkItems={navLinkItems} />
      ) : (
        <NavDesktop linkItems={navLinkItems} />
      )}
    </nav>
  );
};

export default Nav;
