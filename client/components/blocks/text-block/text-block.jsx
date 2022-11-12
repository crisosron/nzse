import ReactMarkdown from 'react-markdown';
import Container from '../../container';

const TextBlock = ({ _id, content }) => {
  return (
    <Container>
      <div className="prose md:prose-lg lg:prose-lg leading-normal flex flex-col lg:items-start lg:max-w-full">
        <ReactMarkdown>
          { content }
        </ReactMarkdown>
      </div>
    </Container>
  );
};

export default TextBlock;