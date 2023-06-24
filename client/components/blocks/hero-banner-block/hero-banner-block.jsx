import Image from 'next/image';
import { unwrapEntityResponse } from '../../../lib/utils';
import Container from '../../container';
import ButtonBlock from '../button-block';

// Note: heroBannerBlockTitle is the gql alias assigned to title to prevent field name conflicts
// with the field 'title' in the query
const HeroBannerBlock = ({
  preTitle,
  heroBannerBlockTitle: title,
  subtitle,
  callToAction,
  image,
}) => {
  const { url: imageUrl, alternativeText } = unwrapEntityResponse(image);
  const ctaButtonProps = callToAction?.[0];
  return (
    // Notes:
    //
    // Negative mx values on the root element cancels out the margins set out by the Layout component. This enables this component's width
    // to extend to the full width of the view port (though ideally, a mechanism should be implemented that allows for
    // the application of default layout margins on a per-component basis, rather than being applied to a parent div
    // that renders all body content)
    //
    // NextJS Image component is used to render the image to take advantage of image optimization
    // mechanisms implemented by NextJS (which is especially important in this case because its
    // a hero image). A mixture of absolute and relative positioning on divs are used to load the
    // image as a background image, without actually using css background image rules.
    <div className='HeroBannerBlock h-[80vh] relative font-poppins'>
      <div className='relative w-full h-full'>
        <Image src={imageUrl} alt={alternativeText} layout='fill' objectFit='cover' priority />
      </div>
      <Container>
        <div className='absolute top-0 w-[80%] h-full flex leading-snug flex-col justify-end py-5 md:py-0 text-white z-10 md:justify-center max-w-[75%] md:max-w-[40%]'>
          {preTitle && <span className='block text-h3 md:text-h3-xl lg:text-h3-2xl'>{preTitle}</span>}
          {title && (
            <span className='block text-h1 text-white md:text-h1-xl lg:text-h1-2xl font-medium'>
              {title}
            </span>
          )}
          {subtitle && <span className='block text-h5 md:text-h5-xl lg:text-h5-2xl'>{subtitle}</span>}
          {ctaButtonProps && (
            <ButtonBlock {...ctaButtonProps} className='max-w-[80%] text-center mb-0 mt-4' />
          )}
        </div>
      </Container>
    </div>
  );
};

export default HeroBannerBlock;
