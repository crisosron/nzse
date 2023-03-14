const imagesSubquery = `
  image {
    data {
      attributes {
        url
        previewUrl
        width
        height
        alternativeText
        name
        hash
        ext
      }
    }
  }
`;

const fileSubquery = `
  file {
    data {
      attributes {
        url
        name
      }
    }
  }
`;

const generalPageBlocksListSubquery = `
  blocks {
    ...on ComponentContentBlocksTextBlock {
      id
      content
    }
    ...on ComponentContentBlocksTextWithImageBlock {
      id
      content
      textWithImageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksImageBlock {
      id
      caption
      imageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksButtonBlock {
      id
      title
      externalLink
      internalLink {
        data {
          attributes {
            title
            slug
            type
          }
        }
      }
      alignment
    }
    ...on ComponentContentBlocksFlipbookBlock {
      id
      subjectTitle
      flipbookLink
    }
  }
`;

const blocksListSubquery = `
  blocks {
    __typename
    ...on ComponentContentBlocksHeroBannerBlock {
      id
      preTitle
      heroBannerBlockTitle: title
      subtitle
      callToAction {
        id
        title
        link
        alignment
      }
      ${imagesSubquery}
    }
    ...on ComponentContentBlocksLargeCardsBlock {
      cards {
        id
        title
        subtitle
        link {
          data {
            attributes {
              slug
              type
              membersOnly
            }
          }
        }
        ${imagesSubquery}
      }
    }
    ...on ComponentContentBlocksTextBlock {
      id
      content
    }
    ...on ComponentContentBlocksTextWithImageBlock {
      id
      content
      textWithImageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksImageBlock {
      id
      caption
      imageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksButtonBlock {
      id
      title
      externalLink
      internalLink {
        data {
          attributes {
            title
            slug
            type
          }
        }
      }
      alignment
    }
    ...on ComponentContentBlocksCardBlockList {
      cardBlocks {
        id
        title
        bottomLinkText
        content
        generalPage {
          data {
            attributes {
              slug
              title
              type
              membersOnly
            }
          }
        }
        ${imagesSubquery}
      }
    }
    ...on ComponentContentBlocksFlipbookBlock {
      id
      subjectTitle
      flipbookLink
      ${fileSubquery}
    }
  }
`;

const generalPageDataSubquery = `
  data {
    attributes {
      title
      slug
      type
      membersOnly
      createdAt
      publishedAt
      seo {
        metaTitle
        metaDescription
      }
      ${generalPageBlocksListSubquery}
    }
  }
`;

const navigationBlocksListSubquery = `
  __typename,
  ...on ComponentNavigationBlocksSidebarLink {
    sidebarLinkTitle: title
    id
    page {
      ${generalPageDataSubquery}
    }
  }
  ...on ComponentNavigationBlocksSidebarDropdown {
    sidebarDropdownTitle: title
    id
    pages {
      ${generalPageDataSubquery}
    }
  }
`;

export {
  blocksListSubquery,
  imagesSubquery,
  generalPageDataSubquery,
  navigationBlocksListSubquery
};
