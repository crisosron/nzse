import classNames from 'classnames';

const Container = ({ children, noSpacing, className }) => {
  return (
    <div
      className={classNames(
        'Container m-auto max-w-[1640px]',
        { 'mx-[0px] md:mx-[0%] lg:mx-[0%] xlg:max-w-[80%]': noSpacing },
        { 'mx-[23px] md:mx-[9%] lg:mx-[15%] xlg:max-w-[55%] xlg:mx-auto': !noSpacing },
        `${className}`
      )}
    >
      {children}
    </div>
  );
};

export default Container;
