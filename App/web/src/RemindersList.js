import React from 'react';
import moment from 'moment';
import UpdateReminder from './UpdateReminder';


const RemindersList = (props) => {
    const reminder = props.filteredReminders.map((element) =>
        <li key={element.id}>
          <UpdateReminder
            updateReminder={props.updateReminder} 
            defaultValue={element.text}
            elementId={element.id}
            dateScheduled={element.dateScheduled}//{moment(element.dateScheduled).format('MMMM d, yyyy h:mm aa')}
          />
        </li>
    );

    return (
      <ul>
        {reminder}
      </ul>
    );
}

export default RemindersList;