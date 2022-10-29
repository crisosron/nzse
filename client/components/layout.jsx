import { useState, useEffect } from "react";
import Nav from "./nav";
import Footer from "./footer";
import { useMediaQuery } from "@material-ui/core";

const LAYOUT_CLASSES = "font-sansation mx-5 lg:mx-80";
const Layout = ({ children, categories, seo, footerData }) => {
  // useMediaQuery hook used to obtain the correct screen size on initial render
  const initialScreenIsTabletOrMobile = useMediaQuery("(max-width: 1024px)");
  const [screenWidth, setScreenWidth] = useState(
    initialScreenIsTabletOrMobile ? 0 : 1025
  );

  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // Set the screen width on window resize so we can determine if we're on a mobile device
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const isTabletBreakpoint = screenWidth <= 1024;
  const isMobileBreakpoint = screenWidth <= 768;

  return (
    <div className="Layout">
      <header>
        <Nav isMobileDevice={isTabletBreakpoint || isMobileBreakpoint} />
      </header>
      <div className={`page-body ${LAYOUT_CLASSES} flex justify-center`}>
        {children}
      </div>
      <Footer footerData={footerData} />
    </div>
  );
};

export default Layout;
