import { unwrapEntityResponse } from '../../../lib/utils';

const FlipbookBlock = ({ subjectTitle, flipbookLink, file }) => {
  let fileUrl;
  if(file) fileUrl = unwrapEntityResponse(file).url;

  return (
    <div>
      <div className='prose self-center w-full mb-8'>
        {subjectTitle && <h2>{subjectTitle}</h2>}
      </div>
      { 
        fileUrl &&
        <a target='_blank' rel='noreferrer' className='inline-block mb-4' href={fileUrl} download>
          Download this file
        </a>
      }
      <div className='w-full h-[100vh]'>
        <iframe
          className='w-full h-full overflow-hidden'
          src={flipbookLink}
          seamless='seamless'
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FlipbookBlock;
