import React from 'react';

const Filter = (props) => {
  return (
    <div>
      <button onClick={props.setFilterToToday}>Today</button>
      <button onClick={props.setFilterToThisWeek}>This week</button>
      <button onClick={props.setFilterToAll}>All</button>
    </div>
  )
}

export default Filter;