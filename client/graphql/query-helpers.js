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
      }
    }
  }

`;

const blocksListSubquery = `
  blocks {
    __typename
    ...on ComponentContentBlocksTextBlock {
      id
      content
    }
    ...on ComponentContentBlocksTextWithImageBlock {
      id
      content
      ${imagesSubquery}
    }
  }
`;

export { blocksListSubquery, imagesSubquery }