import { getStrapiMedia } from '../lib/media';
import { MEDIA_FILE_TYPES } from '../lib/utils';
import Image from 'next/image'

const CustomImage = ({ image }) => {
  const imageData = getStrapiMedia(image);
  let renderedImage = null;
  const className = "object-cover md:object-scale-down"

  if(!imageData) {
    return (
      <>
        <img src="#" />
      </>
    )
  }
  
  if(imageData.fileType === MEDIA_FILE_TYPES.SVG) {
    renderedImage = <img src={imageData.url} title={imageData.name} alt={imageData.alternativeText} className={className} />
  } else {
    renderedImage = 
      <Image 
        src={imageData.url} 
        title={imageData.name} 
        alt={imageData.alternativeText} 
        width={imageData.width} 
        height={imageData.height}
        className={className}
      />
  }

  return (
    <>
      { renderedImage }
    </>
  )
};

export default CustomImage;