import Nav from "./nav";

const Layout = ({ children, categories, seo }) => (
  <div className="font-sansation m-5 lg:mx-32 border">
    <Nav categories={categories} />
    {children}
  </div>
);

export default Layout;