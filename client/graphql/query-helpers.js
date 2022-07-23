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

// TODO: Investigate what happens if a text block, and a text with image block are both present with
// the exact same value for their content field. Will there be a conflict?
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
      caption
      imageBlockImage: ${imagesSubquery}
    }
    ...on ComponentContentBlocksButtonBlock {
      id
      title
      link
      alignment
    }
    ...on ComponentContentBlocksCardBlockList {
      cardBlocks {
        id
        title
        bottomLinkText
        content
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

export { blocksListSubquery, imagesSubquery }