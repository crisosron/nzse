import { gql } from "@apollo/client";
import { blocksListSubquery, imagesSubquery } from "./query-helpers";

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
      data {
        attributes {
          title
          slug
          audience
          membersOnly
          landingPage
          createdAt
          publishedAt
          childPages {
            data {
              attributes {
                title
                audience
                slug
                membersOnly
                landingPage
              }
            }
          }
          ${imagesSubquery}
          ${blocksListSubquery}
        }
      }
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

export { 
  getAllArticles,
  getHomepage,
  getGlobalAttributes,
  getGlobalSeo,
  getAllGeneralPages
}