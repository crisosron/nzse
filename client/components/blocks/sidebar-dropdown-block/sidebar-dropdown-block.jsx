import { unwrapEntityResponse } from "../../../lib/utils";

const SidebarDropdownBlock = ({ sidebarDropdownTitle: title, pages: pagesData }) => {
  const pages = pagesData.data.map(pageData => unwrapEntityResponse(pageData).attributes);
  
  return (
    <div>
      SidebarDropdownBlock
    </div>
  );
}

export default SidebarDropdownBlock;