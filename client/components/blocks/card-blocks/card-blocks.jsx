import CardBlock from '../card-block';

const CardBlocks = ({ cardBlocks }) => {
  return (
    <div className='mt-8 w-full flex flex-col lg:flex-row justify-around self-center'>
      {cardBlocks.length &&
        cardBlocks.map((cardBlock, index) => {
          return <CardBlock key={`card-block-${index}`} {...cardBlock} />;
        })}
    </div>
  );
};

export default CardBlocks;
