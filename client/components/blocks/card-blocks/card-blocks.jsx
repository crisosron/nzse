import classNames from 'classnames';
import CardBlock from '../card-block';

const CardBlocks = ({ cardBlocks }) => {
  return (
    <div className={classNames('flex flex-col lg:flex-row', {
      'justify-center': cardBlocks.length < 4,
      'justify-between': cardBlocks.length === 4
    })}>
      {cardBlocks.length &&
        cardBlocks.map((cardBlock, index) => {
          return <CardBlock key={`card-block-${index}`} {...cardBlock} />;
        })}
    </div>
  );
};

export default CardBlocks;
