import { hasUncaughtExceptionCaptureCallback } from "process";

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
}


// ========================== FUNCTIONS ==========================

// When collection records are queried for, Strapi returns graphql requests in the format:
// 'data: { attributes: { desired information here } }'
//
// This is just a helper function to return the attributes prop directly as this contains all the
// useful information we want from a response
const unwrapEntityResponse = (response) => {
  if(!response.data) return response;
  return response.data.attributes;
}

const formatDate = (dateString) => {
  if(typeof dateString !== 'string') throw new Exception('Expected date argument to be a string');
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', DATE_OPTIONS).replace(',', '');
}

export { MEDIA_FILE_TYPES, unwrapEntityResponse, formatDate };