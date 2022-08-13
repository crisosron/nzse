import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks }) => {
  return (
    <div className="lg:py-16 lg:pr-4 border-r-2 border-gray">
      <Blocks blocks={navBlocks} />
    </div>
  );
};

export default Sidebar;