import React from 'react';

const Filter =(props) => {
  return (
    <div>
      <button onClick={props.setFilterToToday}>Today</button>
      <button onClick={props.setFilterToTomorrow}>Tomorrow</button>
      <button onClick={props.setFilterToNextWeek}>Next Week</button>
    </div>
  )
}

export default Filter;