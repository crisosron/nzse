import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if(!media.data) return;
  const { url } = media.data.attributes;
  let imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  if(process.env.NODE_ENV === 'development') imageUrl = imageUrl.replace('strapi', 'localhost')
  return imageUrl;
}