import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks, className }) => {
  console.log('Sidebar props className', className)
  return (
    <div className={`Sidebar lg:py-16 border-r-2 border-gray md:min-w-[40] lg:min-w-48 md:flex md:justify-center ${className}`}>
      <Blocks blocks={navBlocks} />
    </div>
  );
};

export default Sidebar;