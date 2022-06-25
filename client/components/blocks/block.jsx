import { TextBlock } from './index';

const blockNameToComponentMapping = {
  'TextBlock': TextBlock
};

const Block = ({ blockRecord }) => {
  const blockType = blockRecord.__typename
  if (blockType in blockNameToComponentMapping) {
    const Component = blockNameToComponentMapping[blockType];
    return <Component {...blockRecord} />;
  }

  return (
    <div>
      Don't know how to render the block '{blockType}'!
    </div>
  );

};

export default Block;