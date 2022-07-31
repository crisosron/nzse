import { unwrapEntityResponse } from "../../../lib/utils";

const SidebarLinkBlock = ({ sidebarLinkTitle: title, page }) => {
  const { 
    title: pageTitle,
    slug: pageSlug,
    audience: pageAudience,
    membersOnly: pageMembersOnly
  } = unwrapEntityResponse(page);
  
  return (
    <div>
      SidebarLinkBlock
    </div>
  )
};

export default SidebarLinkBlock;