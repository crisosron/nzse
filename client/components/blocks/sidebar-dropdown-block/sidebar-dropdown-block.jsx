import { unwrapEntityResponse } from "../../../lib/utils";

const ChevronRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-8 w-8 fill-gray">
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  )
}

const SidebarDropdownBlock = ({ sidebarDropdownTitle: title, pages: pagesData }) => {
  const pages = pagesData.data.map(pageData => unwrapEntityResponse(pageData).attributes);
  
  return (
    <div className="flex items-center">
      <span className="inline-block text-gray">{title}</span>
      <ChevronRight />
    </div>
  );
}

export default SidebarDropdownBlock;