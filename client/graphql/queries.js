import { gql } from "@apollo/client";
import { blocksListSubquery, generalPageDataSubquery } from "./query-helpers";

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