// import { gql } from '@apollo/client';
import {
  blocksListSubquery,
  generalPageDataSubquery,
  navigationBlocksListSubquery
} from './query-helpers';

// ================================ FIXED QUERIES ================================ //
/**
 * In this project, a 'fixed' query is a query that doesn't change. If you want to use a query with
 * changing values (e.g. a query that filters for a given value), see the query builders towards
 * the bottom of this file for a pattern on how to achieve this.
 */

const getAllArticles = `
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

const getAllGeneralPages = `
  query allGeneralPages {
    generalPages(pagination: { limit: -1 }) {
      ${generalPageDataSubquery}
    }
  }
`;

const getHomepage = `
  query homepage {
    homepage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
          }
          ${blocksListSubquery}
        }
      }
    }
  }
`;

const getGlobalAttributes = `
  query globalAttributes {
    global {
      data {
        attributes {
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

const getGlobalSeo = `
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

const getAllGeneralPageSlugs = `
  query allGeneralPageSlugs {
    generalPages(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

const getSidebar = `
  query sidebar {
    sidebar {
      data {
        attributes {
          patientsSidebar {
            ${navigationBlocksListSubquery}
          }
          professionalsSidebar {
            ${navigationBlocksListSubquery}
          }
          rootSidebar {
            ${navigationBlocksListSubquery}
          }
        }
      }
    }
  }
`;

const getFooter = `
  query footer {
    footer {
      data {
        attributes {
          socialLinks {
            twitterLink
            facebookLink
            linkedInLink
            instagramLink
          }
          contactFields {
            emailAddress
            organizationName
            phoneNumber
            poBox
          }
          address
          links {
            ${generalPageDataSubquery}
          }
        }
      }
    }
  }
`;

const getNavigation = `
  query navigation {
    navigation {
      data {
        attributes {
          navLinkItems {
            label
            page {
              ${generalPageDataSubquery}
            }
            childPages {
              ${generalPageDataSubquery}
            }
          }
        }
      }
    }
  }
`;

const getMemberships = `
  query memberships {
    memberships {
      data {
        attributes {
          title
          description
          stripePriceId
        }
      }
    }
  }
`;

const getJoinPage = `
  query joinPage {
    joinPage {
      data {
        id
        attributes {
          seo {
            metaTitle,
            metaDescription
          }
          formIntro,
          yourDetailsSectionDescription,
          addressSectionDescription,
          professionalDetailsSectionDescription,
          membershipSectionDescription,
          yourAccountSectionDescription,
          declarationSectionDescription,
          termsAndConditionsPage {
            ${generalPageDataSubquery}
          },
          privacyPolicyPage {
            ${generalPageDataSubquery}
          },
          successMessage
          specialisationOptions
        }
      }
    }
  }
`;
// ================================ QUERY BUILDERS ================================ //
/**
 * In this project, query builders are used for queries that can take in values from a client,
 * which is then used in the query. This is useful for filtering the queries by given values.
 */

/**
 * Note on general pages:
 *
 * General pages have a 'type' field that dictates whether the page belongs to the
 * '/professionals/<slug>' route, or '/patients/<slug>' route. Some of the query builders below
 * takes this into account by taking in a value for 'type'.
 */

const buildGeneralPageBySlugQuery = (slug) => {
  return `
    query generalPageBySlug {
      generalPages(filters: { slug: { eq: "${slug}" } }, pagination: { limit: -1 } ) {
        ${generalPageDataSubquery}
      }
    }
  `;
};

const buildGeneralPageBySlugAndTypeQuery = (slug, type) => {
  return `
    query generalPageBySlugAndType {
      generalPages(filters: { 
        and: [
          { slug: { eq: "${slug}" } }, 
          { type: { eq: "${type}" } } 
        ]}
        pagination: { limit: -1 }
      ) {
        ${generalPageDataSubquery}
      }
    }
  `;
};

const buildGeneralPageSlugsByTypeQuery = (type) => {
  return `
    query generalPageSlugsByType {
      generalPages(filters: { type: { eq: "${type}" } }, pagination: { limit: -1 } ) {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;
};

export {
  getAllArticles,
  getHomepage,
  getGlobalAttributes,
  getGlobalSeo,
  getAllGeneralPages,
  getAllGeneralPageSlugs,
  getSidebar,
  getFooter,
  getNavigation,
  getMemberships,
  getJoinPage,
  buildGeneralPageBySlugAndTypeQuery,
  buildGeneralPageSlugsByTypeQuery,
  buildGeneralPageBySlugQuery
};
