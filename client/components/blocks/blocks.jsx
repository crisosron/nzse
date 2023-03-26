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
import classNames from 'classnames';

const CONTENT_BLOCK_NAMES = [
  'ComponentContentBlocksTextBlock',
  'ComponentContentBlocksTextWithImageBlock',
  'ComponentContentBlocksImageBlock',
  'ComponentContentBlocksButtonBlock',
  'ComponentContentBlocksCardBlockList',
  'ComponentContentBlocksCardBlock',
  'ComponentContentBlocksFlipbookBlock',
  'ComponentContentBlocksHeroBannerBlock',
  'ComponentContentBlocksLargeCardsBlock'
];

const Block = ({ blockRecord, noContainerSpacing }) => {
  const blockTypeNameToComponentMapping = {
    ComponentContentBlocksTextBlock: TextBlock,
    ComponentContentBlocksTextWithImageBlock: TextWithImageBlock,
    ComponentContentBlocksImageBlock: ImageBlock,
    ComponentContentBlocksButtonBlock: ButtonBlock,
    ComponentContentBlocksCardBlockList: CardBlocks,
    ComponentContentBlocksCardBlock: CardBlock,
    ComponentContentBlocksFlipbookBlock: FlipbookBlock,
    ComponentContentBlocksHeroBannerBlock: HeroBannerBlock,
    ComponentContentBlocksLargeCardsBlock: LargeCardsBlock,
    ComponentNavigationBlocksSidebarLink: SidebarLinkBlock,
    ComponentNavigationBlocksSidebarDropdown: SidebarDropdownBlock
  };

  const blockType = blockRecord.__typename;
  if (blockType in blockTypeNameToComponentMapping) {
    const Component = blockTypeNameToComponentMapping[blockType];
    if (blockType === 'ComponentContentBlocksHeroBannerBlock')
      return <Component {...blockRecord} />;
    return (
      <Container noSpacing={noContainerSpacing}>
        <Component {...blockRecord} />
      </Container>
    );
  }

  return <div>Don&apos;t know how to render the block &apos;{blockType}&apos;</div>;
};

/**
 * A 'Content Block' is a block that is meant to display content for the site user. Content editable
 * blocks such as navigation blocks do not fall into this category
 * @param {string} blockName The name of the block
 * @returns A boolean indicating if the given blockTypeName corresponds to a content block
 */
const isContentBlock = (blockName) => {
  return CONTENT_BLOCK_NAMES.includes(blockName);
};

const Blocks = ({ blocks, noContainerSpacing }) => {
  return (
    <div>
      {blocks &&
        blocks.map((block) => {
          const { id, __typename: blockType } = block;
          return (
            <div
              key={`${blockType}-${id}`}
              className={classNames('ContentBlockContainer', {
                'mb-8 md:mb-10': isContentBlock(blockType)
              })}
            >
              <Block blockRecord={block} noContainerSpacing={noContainerSpacing} />
            </div>
          );
        })}
    </div>
  );
};

export default Blocks;
