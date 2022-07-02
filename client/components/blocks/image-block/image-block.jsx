import CustomImage from "./index";

const ImageBlock = ({ image }) => {
  console.log('Got image for ImageBlock: ', image);
  return (
    <>
      <CustomImage image={image}/>
    </>
  );
};

export default ImageBlock;