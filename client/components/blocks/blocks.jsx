import { ImageBlock, TextBlock, TextWithImageBlock } from './index';

const Block = ({ blockRecord }) => {
  const blockTypeNameToComponentMapping = {
    'ComponentContentBlocksTextBlock': TextBlock,
    'ComponentContentBlocksTextWithImageBlock': TextWithImageBlock,
    'ComponentContentBlocksImageBlock': ImageBlock
  };

  const blockType = blockRecord.__typename;
  if (blockType in blockTypeNameToComponentMapping) {
    const Component = blockTypeNameToComponentMapping[blockType];
    return <Component {...blockRecord} />;
  }

  return (
    <div>
      Don't know how to render the block '{blockType}'
    </div>
  );

};

const Blocks = ({ blocks }) => {
  return (
    <div className="leading-normal flex flex-col lg:items-start">
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