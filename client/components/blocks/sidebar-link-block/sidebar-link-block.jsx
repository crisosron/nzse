import { unwrapEntityResponse } from "../../../lib/utils";

const SidebarLinkBlock = (props) => {
  // TODO: Get users logged in status somehow...
  console.log('SidebarLinkBlock props: ', props);
  const { sidebarLinkTitle: title, page, user } = props;
  const { 
    title: pageTitle,
    slug: pageSlug,
    audience: pageAudience,
    membersOnly: pageMembersOnly
  } = unwrapEntityResponse(page);

  console.log('user: ', user);

  const audienceRoute = pageAudience === "Patients" ? "patients" : "professionals";

  return (
    <a href={`/${audienceRoute}/${pageSlug}`} className="inline-block text-gray mb-4">{ title || pageTitle }</a>
  )
};

export default SidebarLinkBlock;