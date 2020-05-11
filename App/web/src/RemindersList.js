import React from 'react';
import moment from 'moment';

const RemindersList = (props) => {
  const reminder = props.filteredReminders.map((element) =>
    <li key={element.id}>
      {element.text}
      {moment(element.dateScheduled).format('MMMM Do YYYY, h:mm')}
    </li>
  )
  return (
    <ul>
      {reminder}
    </ul>
  )
}

export default RemindersList;