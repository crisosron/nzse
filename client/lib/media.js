import { MEDIA_FILE_TYPES } from './utils';

const extToFileTypeMapping = {
  '.jpg': MEDIA_FILE_TYPES.JPG,
  '.svg': MEDIA_FILE_TYPES.SVG,
  '.png': MEDIA_FILE_TYPES.PNG
};

export function getStrapiMedia(media) {
  if (!media.data) return;
  const { ext } = media.data.attributes;
  return {
    ...media.data.attributes,
    fileType: extToFileTypeMapping[ext]
  };
}

// TODO: Investigate why docker container restarts causes the assets to be deleted
// When this is resolved, perhaps we can revert back to using the local machine to store images,
// rather than storing all images used in dev in the cloudinary
// export function getStrapiMedia(media) {
//   if(!media.data) return;
//   const { url } = media.data.attributes;
//   let imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
//   if(process.env.NODE_ENV === 'development') imageUrl = imageUrl.replace('strapi', 'localhost')
//   return imageUrl;
// }
