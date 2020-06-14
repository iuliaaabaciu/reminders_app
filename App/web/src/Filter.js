import React from 'react';

const Filter = (props) => {
  return (
    <div className="box displayEvenly">
      <button className="button btnDisplay" onClick={props.setFilterToToday}>Today</button>
      <button className="button btnDisplay" onClick={props.setFilterToThisWeek}>This week</button>
      <button className="button btnDisplay" onClick={props.setFilterToAll}>All</button>
    </div>
  )
}

export default Filter;