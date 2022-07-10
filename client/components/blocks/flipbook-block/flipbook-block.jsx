import { unwrapEntityResponse } from "../../../lib/utils";

const FlipbookBlock = ({ id, subjectTitle, flipbookLink, file }) => {
  // const { url: fileUrl, name: fileName } = unwrapEntityResponse(file);
  return (
    <div>
      { subjectTitle && <h2>{subjectTitle}</h2> }
      {/* { flipbookLink } */}
      {/* { fileUrl }
      { fileName } */}
      FlipbookBlock
    </div>
  );
};

export default FlipbookBlock;