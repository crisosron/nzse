import { buildPageUrl } from '../../../lib/utils';
import Link from 'next/link';

const buildPropDependentClassNames = (props) => {
  const { alignment } = props;
  let classNames = 'md:justify-start';
  if (alignment === 'Center') classNames = 'md:justify-center';
  else if (alignment === 'Right') classNames = 'md:justify-end';
  return classNames;
};

const ButtonBlock = ({ title, externalLink, internalLink, alignment, className }) => {
  const dynamicClassNames = buildPropDependentClassNames({ alignment });

  const renderLink = () => {
    const anchorElement = (href) => (
      <a
        className='bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150'
        href={href}
      >
        {title}
      </a>
    );

    if (internalLink && internalLink.data) {
      const internalLinkURL = buildPageUrl(internalLink.data.attributes);
      return (
        <Link href={internalLinkURL} passHref>
          {anchorElement()}
        </Link>
      );
    }

    return anchorElement(externalLink);
  };

  renderLink();

  return (
    <div className={`my-8 flex flex-col md:flex-row ${dynamicClassNames} ${className}`}>
      {renderLink()}
    </div>
  );
};

export default ButtonBlock;
