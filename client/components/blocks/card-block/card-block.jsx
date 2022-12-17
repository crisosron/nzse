import { unwrapEntityResponse, formatDate, buildPageUrl } from '../../../lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const CardBlock = (props) => {
  const { content, title, bottomLinkText, image, generalPage } = props;

  const page = unwrapEntityResponse(generalPage.data);
  const pageUrl = buildPageUrl(page);

  const { title: pageTitle } = page;
  const { url: imageUrl, alternativeText: imageAlt } = unwrapEntityResponse(image);

  return (
    <Link href={`/${pageUrl}`}>
      <a className='card-block w-full my-4 lg:mr-4 last:mr-0 lg:my-0 md:max-w-lg lg:max-w-xs h-100 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all self-center flex flex-col'>
        <div className='flex-none w-full h-2/4 overflow-hidden relative'>
          <Image src={imageUrl} layout='fill' objectFit='cover' alt={imageAlt} />
        </div>
        <div className='flex-grow overflow-hidden px-6 py-4'>
          <div className='font-medium text-h3 mb-2 text-light-blue'>{title || pageTitle}</div>
          <p className='text-dark-blue text-base'>{content}</p>
        </div>
        <div className='h-16 px-6 py-2 flex self-end items-center text-link-blue'>
          {/* Fake link with a hover effect*/}
          <span className='hover:text-lightest-blue'>{bottomLinkText}</span>
        </div>
      </a>
    </Link>
  );
};

export default CardBlock;
