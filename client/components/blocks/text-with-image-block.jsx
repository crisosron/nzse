import ReactMarkdown from 'react-markdown';
import { CustomImage } from '../index';

const TextWithImageBlock = ({ _id, content, image, leftAligned }) => {
  return (
    <div className="prose md:prose-lg lg:prose-lg leading-normal flex flex-col lg:items-start">
      <ReactMarkdown>
        { content }
      </ReactMarkdown>
      { image && <CustomImage image={image} /> }
    </div>
  );
};

// Can't use default export here because of the ReactMarkdown import
export { TextWithImageBlock };