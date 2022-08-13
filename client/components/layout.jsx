import Nav from "./nav";

const Layout = ({ children, categories, seo }) => (
  <div className="font-sansation mx-5 lg:mx-80 xl:mx-96">
    <Nav categories={categories} />
    {children}
  </div>
);

export default Layout;