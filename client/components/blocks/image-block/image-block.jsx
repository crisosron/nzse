import CustomImage from "../../custom-image";

const ImageBlock = ({ imageBlockImage: image, caption }) => {
  return (
    <div className="my-8 flex flex-col">
      <div className="flex flex-col mb-5">
        <CustomImage image={image} />
      </div>
      <div className="text-center">
        <p className="text-gray">{ caption }</p>
      </div>
    </div>
  );
};

export default ImageBlock;