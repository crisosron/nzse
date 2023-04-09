import { unwrapEntityResponse } from '../../../lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SidebarLinkBlock = (props) => {
  const { sidebarLinkTitle: title, page, className } = props;
  const {
    title: pageTitle,
    slug: pageSlug,
    type: pageType,
  } = unwrapEntityResponse(page);

  const router = useRouter();
  
  let href;
  if(!pageType) href = '';
  else if(pageType.toLowerCase() === 'root') href = `/${pageSlug}`;
  else `/${pageType.toLowerCase()}/${pageSlug}`;

  const pathComponents = router.asPath.split('/');
  const representsCurrentRoute = pathComponents[pathComponents.length - 1] === pageSlug;

  return (
    <Link href={href}>
      <a
        className={`block mb-4 ${
          representsCurrentRoute ? 'text-light-blue-700' : 'text-gray'
        } ${className}`}
      >
        {title || pageTitle}
      </a>
    </Link>
  );
};

export default SidebarLinkBlock;
