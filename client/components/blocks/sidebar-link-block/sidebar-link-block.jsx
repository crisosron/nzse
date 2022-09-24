import { unwrapEntityResponse } from "../../../lib/utils";
import { useRouter } from 'next/router';
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

  const router = useRouter()
  const audienceRoute = pageAudience === "Patients" ? "patients" : "professionals";
  const pathComponents = router.asPath.split('/')
  const representsCurrentRoute = pathComponents[pathComponents.length - 1] === pageSlug

  return (
    <Link href={`/${audienceRoute}/${pageSlug}`}>
      <a className={`inline-block mb-4 ${representsCurrentRoute ? 'text-light-blue-700' : 'text-gray'}`}>{title || pageTitle}</a>
    </Link>
  )
};

export default SidebarLinkBlock;