import React from 'react';
import moment from 'moment';

class RemindersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderId: '',
      reminderValue: '',
    }
  }

  onInputChange = (event, id) => {
    this.setState({ reminderValue: event.target.value, reminderId: id})
    console.log(this.state.reminderId)
  }

  onInputKeypress = () => {
    const updatedReminder = this.state;
    this.props.updateReminder(updatedReminder);
  }

  render() {
    const reminder = this.props.filteredReminders.map((element) =>
        <li key={element.id}>
          <input 
            defaultValue={element.text}
            onChange={(e) => this.onInputChange(e, element.id)}
            onKeyPress={this.onInputKeypress}
          />
          <input 
            value={moment(element.dateScheduled).format('MMMM Do YYYY, h:mm')}
          />
        </li>
    );

    return (
      <ul>
        {reminder}
      </ul>
    );
  }
}

export default RemindersList;