import Container from "../../container";
import CardBlock from "../card-block";

const CardBlocks = ({ cardBlocks }) => {
  return (
    <Container>
      <div className="mt-16 flex flex-col lg:flex-row">
        {cardBlocks.length &&
          cardBlocks.map((cardBlock, index) => {
            return <CardBlock key={`card-block-${index}`} {...cardBlock} />;
          })}
      </div>
    </Container>
  );
};

export default CardBlocks;
