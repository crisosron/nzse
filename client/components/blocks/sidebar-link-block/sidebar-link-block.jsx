import { unwrapEntityResponse } from "../../../lib/utils";
import Link from 'next/link'

const SidebarLinkBlock = (props) => {
  // TODO: Get users logged in status somehow...
  const { sidebarLinkTitle: title, page, user } = props;
  const { 
    title: pageTitle,
    slug: pageSlug,
    audience: pageAudience,
    membersOnly: pageMembersOnly
  } = unwrapEntityResponse(page);

  const audienceRoute = pageAudience === "Patients" ? "patients" : "professionals";

  return (
    <Link href={`/${audienceRoute}/${pageSlug}`}>
      <a className="inline-block text-gray mb-4"> {title || pageTitle} </a>
    </Link>
  )
};

export default SidebarLinkBlock;