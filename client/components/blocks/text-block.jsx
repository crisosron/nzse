import ReactMarkdown from 'react-markdown';

const TextBlock = ({ _id, content }) => {
  return (
    <>
      <ReactMarkdown>
        { content }
      </ReactMarkdown>
    </>
  );
};

// Can't use default export here because of the ReactMarkdown import
export { TextBlock };