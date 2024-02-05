
function Stats({items}) {
    const numItem = items.length;
    const numPacked = items.filter((item)=>item.packed).length;
    const percentage =items.length!== 0 ?Math.round(numPacked/numItem*100):0;
    return (
      <footer className="stats">
        {items.length!==0?`
          ${percentage === 100 ? 'You got everything! Ready to go. ✈️': `You have ${numItem} item on your list, and you already packed ${numPacked} (${percentage}%.)`}`:"Add some items to go to the trip.✈️"}
        
      </footer>
    );
  }
  export default Stats;