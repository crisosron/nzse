import ReactMarkdown from 'react-markdown';

const TextBlock = ({ id, content }) => {
  return (
    <div className="prose md:prose-lg lg:prose-lg leading-normal flex flex-col lg:items-start lg:max-w-full">
      <ReactMarkdown>
        { content }
      </ReactMarkdown>
    </div>
  );
};

export default TextBlock;
