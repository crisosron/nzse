import CustomImage from '../../custom-image';

const ImageBlock = ({ imageBlockImage: image, caption }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <CustomImage image={image} />
      </div>
      <div className='text-center'>
        <p className='text-gray mb-0'>{caption}</p>
      </div>
    </div>
  );
};

export default ImageBlock;
