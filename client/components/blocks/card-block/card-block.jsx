import { unwrapEntityResponse, formatDate } from "../../../lib/utils";

const CardBlock = ({ id, content, title, bottomLinkText, generalPage }) => {
  const {
    title: linkedPageTitle,
    slug: linkedPageSlug,
    createdAt: linkedPageCreatedAt,
    publishedAt: linkedPagePublishedAt
  } = unwrapEntityResponse(generalPage);

  console.log('linkedPageTitle: ', linkedPageTitle);
  console.log('linkedPageSlug: ', linkedPageSlug);
  console.log('linkedPageCreatedAt: ', formatDate(linkedPageCreatedAt));
  console.log('linkedPagePublishedAt: ', formatDate(linkedPagePublishedAt));

  return (
    <div>
      CardBlock
      { title ||  linkedPageTitle }
      { content }
      { bottomLinkText }
    </div>
  );
};

export default CardBlock;