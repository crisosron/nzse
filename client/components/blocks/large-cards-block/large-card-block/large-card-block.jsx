import { unwrapEntityResponse } from "../../../../lib/utils";

const LargeCardBlock = ({ id, title, subtitle, link, image }) => {
  // console.log('LargeCardBlock props: ', props);
  const { url: imageUrl, alternativeText } = unwrapEntityResponse(image);
  const linkedPage = unwrapEntityResponse(link);
  console.log('linkedPage: ', linkedPage);
  
  return (
    <div>
      LargeCardBlock
    </div>
  )
}

export default LargeCardBlock;