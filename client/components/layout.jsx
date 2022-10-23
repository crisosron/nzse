import Nav from "./nav";
import Footer from './footer';

const LAYOUT_CLASSES = 'font-sansation mx-5 lg:mx-80'
const Layout = ({ children, categories, seo, footerData }) => (
  <div className="Layout">
    <div className={`page-body ${LAYOUT_CLASSES} flex justify-center`}>
      {children}
    </div>
    <Footer footerData={footerData} />
  </div>

);

export default Layout;