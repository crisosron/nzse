// ========================== CONSTANTS ==========================
const MEDIA_FILE_TYPES = {
  JPG: 'jpg',
  SVG: 'svg',
  PNG: 'png'
};

const DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// ========================== FUNCTIONS ==========================

// When collection records are queried for via graphql, Strapi returns the response in the format:
// 'data: { attributes: { desired information here } }'
//
// This is just a helper function to return the attributes prop directly as this contains all the
// useful information we want from a response
const unwrapEntityResponse = (response) => {
  if (!response.data) return response;
  return response.data.attributes;
};

// When an entire collection is queried for via graphql, Strapi returns the response in the format:
// 'response: { data: { collectionName: {__typename, data: [Array] } } }'. Given how dense this
// structure is and how cumbersome it is to get to the important bits of data in the data array,
// this helper function exists to extract only the useful data from a given strapi graphql response
// for an arbitrary query against a collection
const unwrapCollectionEntityResponse = (response, collectionName) => {
  return response.data[collectionName].data?.map((obj) => ({ ...obj.attributes }));
};

const formatDate = (dateString) => {
  if (typeof dateString !== 'string') throw new Error('Expected date argument to be a string');
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', DATE_OPTIONS).replace(',', '');
};

/**
 * Builds the direct URL of a page link object from Strapi
 * @param page A strapi link object to a page
 */
const buildPageUrl = (page) => {
  // TODO: If page is membersOnly, route to memberships page?
  if (!page) return null;

  // Check if the page object has already been unwrapped, and if so, use it instead (the unwrapped
  // object is just page, wrapperd means the details are only accessible through page.attributes)
  let pageObj = page.attributes ? page.attributes : page;
  const { type, slug } = pageObj;

  if (!type || !slug) return '/';
  if (type === 'Root') return `/${slug}`;
  return `/${type.toLowerCase()}/${slug}`;
};

export {
  MEDIA_FILE_TYPES,
  unwrapEntityResponse,
  unwrapCollectionEntityResponse,
  formatDate,
  buildPageUrl
};
