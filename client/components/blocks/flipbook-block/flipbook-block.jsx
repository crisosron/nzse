const FlipbookBlock = ({ subjectTitle, flipbookLink }) => {
  return (
    <div>
      <div className='prose self-center w-full mb-8'>{subjectTitle && <h2>{subjectTitle}</h2>}</div>
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
