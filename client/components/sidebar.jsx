import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks, className, title }) => {
  return (
    <div className={`Sidebar p-5 md:px-1 bg-light-blue-100 md:p-10 md:bg-white md:border-r-2 md:border-gray md:min-w-40 md:flex md:flex-col lg:py-16 lg:min-w-48 ${className}`}>
      <p className="inline-block mb-4 text-xl font-semibold text-light-blue">{ title }</p>
      <Blocks blocks={navBlocks} />
    </div>
  );
};

export default Sidebar;