import ReactMarkdown from 'react-markdown';

const TextBlock = ({ content }) => {
  return (
    <div className='prose prose-base leading-normal flex flex-col lg:items-start lg:max-w-full text-base'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default TextBlock;
