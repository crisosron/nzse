import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks, className }) => {
  console.log('Sidebar props className', className)
  return (
    <div className={`Sidebar lg:py-16 lg:pr-4 border-r-2 border-gray md:w-40 lg:w-48 md:flex md:justify-center ${className}`}>
      <Blocks blocks={navBlocks} />
    </div>
  );
};

export default Sidebar;