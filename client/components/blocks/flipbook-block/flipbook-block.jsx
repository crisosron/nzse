import { unwrapEntityResponse } from '../../../lib/utils';

const FlipbookBlock = ({ subjectTitle, flipbookLink, file }) => {
  const { url: fileUrl } = unwrapEntityResponse(file);
  return (
    <div className='my-8 prose self-center w-full h-screen'>
      {subjectTitle && <h2>{subjectTitle}</h2>}
      <a target='_blank' rel='noreferrer' className='inline-block mb-4' href={fileUrl} download>
        Download this file
      </a>
      <iframe
        className='mb-8 w-full h-full'
        src={flipbookLink}
        seamless='seamless'
        scrolling='no'
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FlipbookBlock;
