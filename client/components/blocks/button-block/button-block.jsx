const buildPropDependentClassNames = (props) => {
  const { alignment } = props;
  let classNames = 'md:self-start';
  if (alignment === 'Center') classNames = 'md:self-center';
  else if (alignment === 'Right') classNames = 'md:self-end';
  return classNames;
};

const ButtonBlock = ({ title, link, alignment, className }) => {
  const dynamicClassNames = buildPropDependentClassNames({ alignment });

  return (
    <div className={`my-8 flex flex-col md:flex-row ${dynamicClassNames} ${className}`}>
      <a
        className='bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors'
        href={link}
      >
        {title}
      </a>
    </div>
  );
};

export default ButtonBlock;
