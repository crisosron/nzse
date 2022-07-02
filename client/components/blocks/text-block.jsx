import ReactMarkdown from 'react-markdown';

const TextBlock = ({ _id, content }) => {
  return (
    // 'prose' className required by tailwind to apply tailwindcss to CMSable rich text content
    <div className="prose md:prose-lg lg:prose-lg leading-normal flex flex-col lg:items-start">
      <ReactMarkdown>
        { content }
      </ReactMarkdown>
    </div>
  );
};

// Can't use default export here because of the ReactMarkdown import
export { TextBlock };