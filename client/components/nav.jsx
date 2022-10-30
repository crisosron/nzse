import _ from "lodash";
import { NavMobile, NavDesktop } from './'

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

export default Nav;
