import CustomImage from "../../custom-image";

const ImageBlock = ({ imageBlockImage: image }) => {
  return (
    <div className="my-8 flex flex-col">
      <div className="flex flex-col mb-5">
        <CustomImage image={image} />
      </div>
      <div>
        <p>TODO: Optional CMSable caption goes here</p>
      </div>
    </div>
  );
};

export default ImageBlock;