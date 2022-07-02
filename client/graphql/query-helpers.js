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
      textWithImageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksImageBlock {
      id
      imageBlockImage: ${imagesSubquery}
    }
  }
`;

export { blocksListSubquery, imagesSubquery }