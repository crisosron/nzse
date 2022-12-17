import Blocks from './blocks/blocks';

const Sidebar = ({ navBlocks, className, title }) => {
  return (
    <div
      className={`Sidebar md:ml-[9%] lg:ml-[15%] p-5 md:px-1 shadow bg-light-blue-100 md:p-10 md:shadow-none md:bg-white md:border-r-2 md:border-light-blue-400 md:min-w-40 md:flex md:flex-col lg:py-16 lg:min-w-48 ${className}`}
    >
      <p className='inline-block mb-4 text-xl font-semibold text-light-blue'>{title}</p>
      <Blocks blocks={navBlocks} />
    </div>
  );
};

export default Sidebar;
