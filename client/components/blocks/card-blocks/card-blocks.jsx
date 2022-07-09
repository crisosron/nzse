import CardBlock from "../card-block";

const CardBlocks = ({ cardBlocks }) => {
  return (
    <div>
      { cardBlocks.length && cardBlocks.map((cardBlock, index) => {
        return (
          <CardBlock key={`card-block-${index}`} {...cardBlock} />
        );
      })}
    </div>
  )
};

export default CardBlocks;