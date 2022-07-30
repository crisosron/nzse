import { gql } from "@apollo/client";
import { blocksListSubquery, generalPageDataSubquery } from "./query-helpers";

// ================================ FIXED QUERIES ================================ //
/**
 * In this project, a 'fixed' query is a query that doesn't change. If you want to use a query with
 * changing values (e.g. a query that filters for a given value), see the query builders towards 
 * the bottom of this file for a pattern on how to achieve this.
 */

const getAllArticles = gql`
  query allArticles {
    articles {
      data {
        attributes {
          title
          publishedAt
          blocks {
            __typename
            ... on ComponentContentBlocksImageBlock {
              image {
                data {
                  attributes {
                    url
                    previewUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getAllGeneralPages = gql`
  query allGeneralPages {
    generalPages {
      ${generalPageDataSubquery}
    }
  }
`;

const getHomepage = gql`
  query homepage {
    homepage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            slug
          }
          ${blocksListSubquery}
        }
      }
    }
  }
`;

const getGlobalAttributes = gql`
  query globalAttributes {
    global {
      data {
        attributes {
          siteName
          favicon {
            data {
              attributes {
                name
                alternativeText
                url
              }
            }
          }
        }
      }
    }
  }
`;

const getGlobalSeo = gql`
  query globalSEO {
    globalSeo {
      data {
        attributes {
          metaTitle
          metaDescription
        }
      }
    }
  }
`;

const getAllGeneralPageSlugs = gql`
  query allGeneralPageSlugs {
    generalPages {
      data {
        attributes {
          slug
        }
      }
    }
  }
`

// ================================ QUERY BUILDERS ================================ //
/**
 * In this project, query builders are used for queries that can take in values from a client, 
 * which is then used in the query. This is useful for filtering the queries by given values.
 */

/**
 * Note on general pages:
 * 
 * General pages have an 'audience' field that dictates whether the page belongs to the
 * '/professionals/<slug>' route, or '/patients/<slug>' route. Some of the query builders below
 * takes this into account by taking in a value for 'audience'.
 */

const buildGeneralPageBySlugQuery = (slug) => {
  return gql`
    query generalPageBySlug {
      generalPages(filters: { slug: { eq: "${slug}" } } ) {
        ${generalPageDataSubquery}
      }
    }
  `;
};

const buildGeneralPageBySlugAndAudienceQuery = (slug, audience) => {
  return gql`
    query generalPageBySlugAndAudience {
      generalPages(filters: { 
        and: [
          { slug: { eq: "${slug}" } }, 
          { audience: { eq: "${audience}" } } 
        ]}) {
        ${generalPageDataSubquery}
      }
    }
  `
}

const buildGeneralPageSlugsByAudienceQuery = (audience) => {
  return gql`
    query generalPageSlugsByAudience {
      generalPages(filters: { audience: { eq: "${audience}" } } ) {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;
}

export { 
  getAllArticles,
  getHomepage,
  getGlobalAttributes,
  getGlobalSeo,
  getAllGeneralPages,
  getAllGeneralPageSlugs,
  buildGeneralPageBySlugAndAudienceQuery,
  buildGeneralPageSlugsByAudienceQuery,
  buildGeneralPageBySlugQuery,
}