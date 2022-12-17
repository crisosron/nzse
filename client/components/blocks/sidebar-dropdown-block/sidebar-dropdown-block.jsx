import { useState } from 'react';
import { useRouter } from 'next/router';
import { unwrapEntityResponse } from '../../../lib/utils';
import SidebarLinkBlock from '../sidebar-link-block/sidebar-link-block.jsx';
import { ChevronRightIcon } from '../../svg-components';

const Dropdown = ({ title, items }) => {
  return (
    <div className='Dropdown w-100 min-h-20 pl-2 py-2 transition-all duration-150 ease-linear'>
      {items &&
        items.map((item, index) => (
          <SidebarLinkBlock
            key={`sidebar-dropdown-block-${title}-item-${index}`}
            title={item.title}
            page={item}
            className='text-sm mb-2 last:mb-0'
          />
        ))}
    </div>
  );
};

const SidebarDropdownBlock = ({ sidebarDropdownTitle: title, pages: pagesData }) => {
  // TODO: Currently, duplicate links from the master and other dropdowns are allowed
  // TODO: Currently, links to pages that do not match the type are allowed
  const router = useRouter();
  const pages = pagesData.data.map((pageData) => unwrapEntityResponse(pageData).attributes);

  const containsCurrentRoute = () => {
    const pathComponents = router.asPath.split('/');
    return pages.some((page) => {
      const { slug } = page;
      return pathComponents[pathComponents.length - 1] === slug;
    });
  };

  const hasCurrentRoute = containsCurrentRoute();
  const [open, setOpen] = useState(hasCurrentRoute);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className='SidebarDropdownBlock mb-4'>
      <div className='flex items-center cursor-pointer group select-none' onClick={toggleDropdown}>
        <span
          className={`inline-block group-hover:text-lightest-blue ${
            hasCurrentRoute ? 'text-light-blue-700' : 'text-gray'
          }`}
        >
          {title}
        </span>
        <ChevronRightIcon
          className={`${open ? 'rotate-90' : ''} ${
            hasCurrentRoute ? 'fill-light-blue-700' : 'fill-gray'
          } group-hover:fill-lightest-blue`}
        />
      </div>
      {open && <Dropdown items={pages} />}
    </div>
  );
};

export default SidebarDropdownBlock;
