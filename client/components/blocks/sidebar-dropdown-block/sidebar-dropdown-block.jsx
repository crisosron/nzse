import { useState } from "react";
import { useRouter } from "next/router";
import { unwrapEntityResponse } from "../../../lib/utils";
import SidebarLinkBlock from '../sidebar-link-block/sidebar-link-block.jsx'

const ChevronRight = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={`h-6 w-6 fill-gray ${className}`}>
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  )
}

const Dropdown = ({ title, items }) => {
  return (
    <div className="Dropdown w-100 min-h-20 pl-2 py-2 transition-all duration-150 ease-linear">
      {items && items.map((item, index) =>
        <SidebarLinkBlock key={`sidebar-dropdown-block-${title}-item-${index}`} title={item.title} page={item} className="text-sm md:mb-2 md:last:mb-0" />
      )}
    </div>
  )
}

const SidebarDropdownBlock = ({ sidebarDropdownTitle: title, pages: pagesData }) => {
  const router = useRouter();
  const pages = pagesData.data.map(pageData => unwrapEntityResponse(pageData).attributes);

  const containsCurrentRoute = () => {
    const pathComponents = router.asPath.split('/');
    return pages.some(page => { 
      const { slug } = page;
      return pathComponents[pathComponents.length - 1] === slug
    });
  }

  const [ open, setOpen ] = useState(containsCurrentRoute());

  const toggleDropdown = () => {
    setOpen(!open);
  };
  
  return (
    <div className="SidebarDropdownBlock mb-4">
      <div className="flex items-center cursor-pointer group select-none" onClick={toggleDropdown}>
        <span className="inline-block text-gray group-hover:text-lightest-blue">{title}</span>
        <ChevronRight className={`${open ? 'rotate-90' : ''} group-hover:fill-lightest-blue`} />
      </div>
      { open && <Dropdown items={pages} /> }
    </div>
  );
}

export default SidebarDropdownBlock;