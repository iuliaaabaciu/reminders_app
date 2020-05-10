import React from 'react';
import Filter from './Filter';
import RemindersList from './RemindersList';
import { createReminder, listReminders } from './reminders';
import DatePicker from "react-datepicker";
import RemindersCategory from './RemindersCategory'
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      reminders: [],
      dateScheduled: new Date(),
      categroy: '',
    }
  }

  async componentDidMount() {
    const reminders = await listReminders();
    this.setState({ reminders: reminders });
  }

  onDateChange = (date) => {
    this.setState({ dateScheduled: date })
  }

  onInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue: inputValue })
  }

  onCategorySelect = (event) => { 
    this.setState({ categroy: event.target.value})
  }

  onButtonClick = async (event) => {
    const date = moment(this.state.dateScheduled).format("YYYY-MM-DD HH:MM:SS");
    await createReminder(3, this.state.inputValue, this.state.categroy, date);
  }

  render() {
    return(
      <>
        <input type="text" 
          placeholder="Create your reminder"
          value={this.state.value}
          onChange={this.onInputChange}
          onKeyPress={this.onInputKeypres}
        />

        <DatePicker selected={this.state.dateScheduled}
          onChange={ this.onDateChange }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <RemindersCategory value={this.state.categroy} 
          onChange={this.onCategorySelect}
        />

        <button onClick={this.onButtonClick}>Create reminder</button>

        <RemindersList remid={this.state.reminders}/> 

        <Filter />
      </>
    )
  }
}

export default App;