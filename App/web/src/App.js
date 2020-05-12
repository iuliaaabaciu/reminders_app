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
      category: '',
      filter: 'TODAY',
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
    this.setState({ category: event.target.value})
  }

  onButtonClick = async (event) => {
    const date = moment(this.state.dateScheduled).format("YYYY-MM-DD HH:MM:SS");
    await createReminder(3, this.state.inputValue, this.state.category, date);
    const reminders = await listReminders();
    this.setState({ reminders: reminders, inputValue: '' });
  }

  setFilterToToday = () => {
    this.setState({ filter: "TODAY" });
  }

  setFilterToThisWeek = () => {
    this.setState({ filter: "THIS WEEK" });
  }
  
  setFilterToAll = () => {
    this.setState({ filter: "ALL" });
  }

  filterReminders = (reminders, filter) => {
    const now = moment(new Date(), 'YYYY-MM-DD HH:MM:SS');

    if (filter === 'ALL') {
      return reminders;
    }
 
    if ( filter === 'TODAY' ) {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD HH:MM:SS');
          return (scheduled.diff(now, 'days') < 1)
      })
    }

    if ( filter === 'THIS WEEK' ) {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD HH:MM:SS');
          return (scheduled.diff(now, 'days') < 8 && scheduled.diff(now, 'days') > 1)
      })
    }
  }

  render() {
    const filteredReminders = this.filterReminders(this.state.reminders, this.state.filter);
console.log(filteredReminders);
    return(
      <>
        <input type="text" 
          placeholder="Create your reminder"
          value={this.state.inputValue}
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

        <RemindersCategory 
          value={this.state.category} 
          onChange={this.onCategorySelect}
        />

        <button onClick={this.onButtonClick}>Create reminder</button>

        <RemindersList filteredReminders={filteredReminders}/> 

        <Filter 
          setFilterToAll={this.setFilterToAll}
          setFilterToToday={this.setFilterToToday}
          setFilterToThisWeek={this.setFilterToThisWeek}
        />
      </>
    )
  }
}

export default App;