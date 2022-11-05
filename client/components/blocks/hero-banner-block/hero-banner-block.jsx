// Note: heroBannerBlockTitle is the gql alias assigned to title to prevent field name conflicts
// with the field 'title'
const HeroBannerBlock = ({ id, preTitle, heroBannerBlockTitle: title, subtitle, callToAction, image, className }) => {
  console.log('id: ', id);
  console.log('preTitle: ', preTitle);
  console.log('herobannerBlockTitle: ', title);
  console.log('subTitle: ', subtitle);
  console.log('callToAction :', callToAction);
  console.log('image: ', image);
  console.log('className: ', className);
  return (
    <div>HeroBannerBlock</div>
  )
}

export default HeroBannerBlock;