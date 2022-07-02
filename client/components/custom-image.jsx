import { getStrapiMedia } from '../lib/media';
import { MEDIA_FILE_TYPES } from '../lib/utils';
import Image from 'next/image'

const CustomImage = ({ image }) => {
  const imageData = getStrapiMedia(image);
  let renderedImage = null;

  if(!imageData) {
    return (
      <>
        <img src="#" />
      </>
    )
  }
  
  if(imageData.fileType === MEDIA_FILE_TYPES.SVG) {
    renderedImage = <img src={imageData.url} title={imageData.name} alt={imageData.alternativeText} />
  } else {
    renderedImage = <Image src={imageData.url} title={imageData.name} alt={imageData.alternativeText} width={imageData.width} height={imageData.height}/>
  }

  return (
    <>
      { renderedImage }
    </>
  )

};

export default CustomImage;