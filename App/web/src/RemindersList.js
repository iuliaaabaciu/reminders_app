import React from 'react';
import UpdateReminder from './UpdateReminder';

const RemindersList = (props) => {
    const reminder = props.filteredReminders.map((element) =>
        <li key={element.id}>
          <UpdateReminder
            updateReminder={props.updateReminder} 
            updateDateScheduled={props.updateDateScheduled}
            defaultValue={element.text}
            elementId={element.id}
            dateScheduled={element.dateScheduled}
          />
          <button className="deleteBtn" onClick={() => props.deleteReminder(element.id)}>x</button>
        </li>
    );

    return (
      <div className="box">
        <ul>
          {reminder}
        </ul>
      </div>
    );
}

export default RemindersList;