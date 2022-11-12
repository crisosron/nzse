import { 
  ImageBlock,
  TextBlock,
  TextWithImageBlock,
  ButtonBlock,
  CardBlocks,
  CardBlock,
  FlipbookBlock,
  SidebarLinkBlock,
  SidebarDropdownBlock,
  HeroBannerBlock,
  LargeCardsBlock
} from './index';

import Container from '../container';

const Block = ({ blockRecord, noContainerSpacing }) => {
  const blockTypeNameToComponentMapping = {
    'ComponentContentBlocksTextBlock': TextBlock,
    'ComponentContentBlocksTextWithImageBlock': TextWithImageBlock,
    'ComponentContentBlocksImageBlock': ImageBlock,
    'ComponentContentBlocksButtonBlock': ButtonBlock,
    'ComponentContentBlocksCardBlockList': CardBlocks,
    'ComponentContentBlocksCardBlock': CardBlock,
    'ComponentContentBlocksFlipbookBlock': FlipbookBlock,
    'ComponentContentBlocksHeroBannerBlock': HeroBannerBlock,
    'ComponentContentBlocksLargeCardsBlock': LargeCardsBlock,
    'ComponentNavigationBlocksSidebarLink': SidebarLinkBlock,
    'ComponentNavigationBlocksSidebarDropdown': SidebarDropdownBlock
  };

  const blockType = blockRecord.__typename;
  if (blockType in blockTypeNameToComponentMapping) {
    const Component = blockTypeNameToComponentMapping[blockType];
    if(blockType === 'ComponentContentBlocksHeroBannerBlock') return <Component {...blockRecord} />;
    return (
      <Container noSpacing={noContainerSpacing}>
        <Component {...blockRecord} />
      </Container>
    )
  }

  return (
    <div>
      Don&apos;t know how to render the block &apos;{blockType}&apos;
    </div>
  );
};

const Blocks = ({ blocks, noContainerSpacing }) => {
  return (
    // <div className="leading-normal flex flex-col lg:items-start">leading-normal flex flex-col lg:items-start
    <div>
      { blocks && blocks.map((block) => {
        const { id, __typename: blockType } = block;
        return (
          <Block key={`${blockType}-${id}`} blockRecord={block} noContainerSpacing={noContainerSpacing} />
        );
      })}
    </div>
  );
};

export default Blocks;