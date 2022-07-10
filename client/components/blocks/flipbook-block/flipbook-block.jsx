import { unwrapEntityResponse } from "../../../lib/utils";

const FlipbookBlock = ({ id, title, flipbookLink, file }) => {
  const { url: fileUrl, name: fileName } = unwrapEntityResponse(file);
  return (
    <div>
      { title }
      { flipbookLink }
      { fileUrl }
      { fileName }
    </div>
  );
};

export default FlipbookBlock;