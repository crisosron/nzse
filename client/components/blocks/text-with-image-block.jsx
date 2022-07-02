import ReactMarkdown from 'react-markdown';
import { CustomImage } from '../index';

const TextWithImageBlock = ({ _id, content, image, leftAligned }) => {
  return (
    <div className="prose md:prose-lg lg:prose-lg">
      <ReactMarkdown>
        { content }
      </ReactMarkdown>
      <CustomImage image={image} />
    </div>
  );
};

// Can't use default export here because of the ReactMarkdown import
export { TextWithImageBlock };