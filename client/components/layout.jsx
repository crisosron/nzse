import Nav from "./nav";

const Layout = ({ children, categories, seo }) => (
  <div className="font-sansation m-5 md:m-12">
    <Nav categories={categories} />
    {children}
  </div>
);

export default Layout;