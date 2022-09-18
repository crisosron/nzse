import Nav from "./nav";

const Layout = ({ children, categories, seo }) => (
  <div className="Layout font-sansation mx-5 lg:mx-80 flex justify-center">
    <Nav categories={categories} />
    {children}
  </div>
);

export default Layout;