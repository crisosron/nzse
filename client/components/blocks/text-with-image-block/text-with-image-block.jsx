import ReactMarkdown from "react-markdown";
import CustomImage from "../../custom-image";
import Container from "../../container";

const TextWithImageBlock = ({
  content,
  textWithImageBlockImage: image,
  leftAligned,
}) => {
  return (
    <Container>
      <div className="prose md:prose-lg lg:prose-lg leading-normal flex flex-col lg:items-start">
        <ReactMarkdown>{content}</ReactMarkdown>
        {image && <CustomImage image={image} />}
      </div>
    </Container>
  );
};

export default TextWithImageBlock;
