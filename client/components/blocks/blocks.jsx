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

const Block = ({ blockRecord }) => {
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
    return <Component {...blockRecord} />;
  }

  return (
    <div>
      Don&apos;t know how to render the block &apos;{blockType}&apos;
    </div>
  );
};

const Blocks = ({ blocks }) => {
  return (
    // <div className="leading-normal flex flex-col lg:items-start">leading-normal flex flex-col lg:items-start
    <div>
      { blocks && blocks.map((block) => {
        const { id, __typename: blockType } = block;
        return (
          <Block key={`${blockType}-${id}`} blockRecord={block} />
        );
      })}
    </div>
  );
};

export default Blocks;