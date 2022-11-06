import LargeCardBlock from './large-card-block';

const LargeCardsBlock = ({ cards }) => {
  // console.log('LargeCardsBlock props: ', props);
  return (
    <div>
      { 
        cards && cards.length > 0 && cards.map((card) => {
          return (
            <LargeCardBlock key={card.id} {...card}/>
          )
        }) 
      }
    </div>
  )
}

export default LargeCardsBlock;