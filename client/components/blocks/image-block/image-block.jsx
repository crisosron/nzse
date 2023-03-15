import CustomImage from '../../custom-image';

const ImageBlock = ({ imageBlockImage: image, caption }) => {
  return (
    <div className='flex flex-col md:max-w-[60%]'>
      <div className='flex flex-col'>
        <CustomImage image={image} />
      </div>
      <div className='text-center mt-2 md:mt-5'>
        <p className='text-gray mb-0'>{caption}</p>
      </div>
    </div>
  );
};

export default ImageBlock;
