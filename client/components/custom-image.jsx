import { getStrapiMedia } from '../lib/media';
import { MEDIA_FILE_TYPES } from '../lib/utils';
import Image from 'next/image';

const CustomImage = ({ image }) => {
  const imageData = getStrapiMedia(image);
  let renderedImage = null;

  // These classNames assumes that the parent container has display: flex
  const className = 'object-cover md:object-scale-down';

  if (!imageData) {
    return (
      <>
        <img src='#' />
      </>
    );
  }

  if (imageData.fileType === MEDIA_FILE_TYPES.SVG) {
    renderedImage = (
      // next/image can't render svgs
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageData.url}
        title={imageData.name}
        alt={imageData.alternativeText}
        className={className}
      />
    );
  } else {
    renderedImage = (
      <Image
        src={imageData.url}
        title={imageData.name}
        alt={imageData.alternativeText}
        width={imageData.width}
        height={imageData.height}
        className={className}
      />
    );
  }

  return <>{renderedImage}</>;
};

export default CustomImage;
