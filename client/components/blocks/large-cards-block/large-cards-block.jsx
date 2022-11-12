import LargeCardBlock from './large-card-block';
import classNames from 'classnames';
import Container from '../../container';

const LargeCardsBlock = ({ cards }) => {
  return (
    <Container>
      <div className={classNames(
        "flex w-full my-8 flex-col md:flex-row",
        { 'justify-center': cards.length === 1 },
        { 'justify-between': cards.length > 1 }
      )}>
        { 
          cards && cards.length > 0 && cards.map((card) => {
            return (
              <LargeCardBlock key={card.id} {...card}/>
            )
          }) 
        }
      </div>
    </Container>
  )
}

export default LargeCardsBlock;