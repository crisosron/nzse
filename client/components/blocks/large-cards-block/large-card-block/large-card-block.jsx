import { buildPageUrl, unwrapEntityResponse } from '../../../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const LargeCardBlock = ({ title, subtitle, link, image }) => {
  const { url: imageUrl, alternativeText } = unwrapEntityResponse(image);
  const linkedPage = unwrapEntityResponse(link);
  let url = '';
  if (linkedPage) url = buildPageUrl(linkedPage);
  return (
    <Link href={url}>
      <a className='LargeCardBlock card-block mb-8 md:mb-0 w-full h-[25em] last:mb-0 md:mr-4 lg:mr-8 md:last:mr-0 flex flex-col shadow-lg transition-all duration-500 hover:shadow-xl font-poppins group'>
        <div className='flex-3 relative'>
          <Image src={imageUrl} alt={alternativeText} layout='fill' objectFit='cover' />
          <div className='absolute top-0 bg-charcoal/0 group-hover:bg-charcoal/20 p-5 w-full h-full flex flex-col justify-end transition-all duration-500'>
            <span className='text-h2 font-medium text-white group-hover:text-lightest-blue transition-all duration-500'>
              {title}
            </span>
          </div>
        </div>
        <div className='overflow-hidden transition-all duration-500 flex flex-1 items-center p-5 md:py-0 text-dark-blue group-hover:bg-light-blue group-hover:text-white group-hover:decoration-2'>
          <span className='text-xs md:text-xl'>{subtitle}</span>
        </div>
      </a>
    </Link>
  );
};

export default LargeCardBlock;
