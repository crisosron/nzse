import { getStrapiMedia } from "../../../lib/media";
import { unwrapEntityResponse, formatDate } from "../../../lib/utils";

const CardBlock = ({ id, content, title, bottomLinkText, image, generalPage }) => {
  const {
    title: linkedPageTitle,
    slug: linkedPageSlug,
    createdAt: linkedPageCreatedAt,
    publishedAt: linkedPagePublishedAt
  } = unwrapEntityResponse(generalPage);

  const imageData = getStrapiMedia(image);

  const handleCardClicked = () => {
    window.location.href = linkedPageSlug;
  };

  return (
    <>
      <div
        className="w-full my-4 lg:my-0 md:max-w-lg lg:max-w-xs h-100 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all self-center flex flex-col"
        href={linkedPageSlug}
        onClick={handleCardClicked}
      >
        <div className="flex-none w-full h-2/4">
          <img src={imageData.url} className="w-full h-full object-cover" alt={imageData.alternativeText} />
        </div>
        <div className="flex-grow overflow-hidden px-6 py-4">
          <div className="font-bold text-xl mb-2 text-light-blue">Title</div>
          { linkedPagePublishedAt && <div className="text-md mb-2 text-light-blue">{formatDate(linkedPagePublishedAt)}</div> }
          <p className="text-gray-700 text-base">
            { content }
          </p>
        </div>
        <div className="h-16 px-6 py-2 flex hover:underline self-end items-center text-link-blue">
          <a href={linkedPageSlug}>{bottomLinkText}</a>
        </div>
      </div>
    </>
  );
};

export default CardBlock;