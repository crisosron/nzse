import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks }) => {
  return (
    <div>
      Sidebar
      <Blocks blocks={navBlocks} />
    </div>
  );
  
};

export default Sidebar;