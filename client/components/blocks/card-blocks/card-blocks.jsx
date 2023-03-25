import CardBlock from '../card-block';

const CardBlocks = ({ cardBlocks }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-between'>
      {cardBlocks.length &&
        cardBlocks.map((cardBlock, index) => {
          return <CardBlock key={`card-block-${index}`} {...cardBlock} />;
        })}
    </div>
  );
};

export default CardBlocks;
