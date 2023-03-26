import { useState, useEffect } from 'react';
import Nav from './nav';
import Footer from './footer';

const Layout = ({ children, footerData, navigationData }) => {
  // The initial state should be derived from the `window` object, but NextJS SSR means that this
  // object is not available during the pre-render as `window` is a client-side only construct.
  //
  // Set a default of 0, but a useEffect (which are called client-side exclusively) will set the
  // correct value here during the hydration render as the useEffect will have access to the window
  // object
  const [screenWidth, setScreenWidth] = useState(0);

  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // Populate the screen width state with the correct value, and add a listener for window resizes
  // so we can determine if we're on a mobile device
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isTabletBreakpoint = screenWidth <= 1024;
  const isMobileBreakpoint = screenWidth <= 768;

  return (
    <div className='Layout'>
      <header>
        <Nav
          navigationData={navigationData}
          isMobileDevice={isTabletBreakpoint || isMobileBreakpoint}
        />
      </header>
      <div className="page-body font-poppins">{children}</div>
      <Footer footerData={footerData} />
    </div>
  );
};

export default Layout;
