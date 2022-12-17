import LargeCardBlock from './large-card-block';
import classNames from 'classnames';

const LargeCardsBlock = ({ cards }) => {
  return (
    <div
      className={classNames(
        'flex w-full flex-col md:flex-row',
        { 'justify-center': cards.length === 1 },
        { 'justify-between': cards.length > 1 }
      )}
    >
      {cards &&
        cards.length > 0 &&
        cards.map((card) => {
          return <LargeCardBlock key={card.id} {...card} />;
        })}
    </div>
  );
};

export default LargeCardsBlock;
