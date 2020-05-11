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
    this.setState({ categroy: event.target.value})
  }

  onButtonClick = async (event) => {
    const date = moment(this.state.dateScheduled).format("YYYY-MM-DD HH:MM:SS");
    await createReminder(3, this.state.inputValue, this.state.categroy, date);
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
    const currentDate = moment().format("YYYY-MM-DD HH:MM:SS");
    // dateScheduled = moment(reminders.dateScheduled).format("YYYY-MM-DD HH:MM:SS");

    if (filter === 'ALL') {
      return reminders;
    }
 
    if ( filter === 'TODAY' ) {
      return reminders.filter((element) => moment(element.dateScheduled).format("YYYY-MM-DD HH:MM:SS").diff(currentDate, 'days') <= 1)
    }
  }

  render() {
    const filteredReminders = this.filterReminders(this.state.reminders, this.state.filter);

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

        <RemindersCategory 
          value={this.state.categroy} 
          onChange={this.onCategorySelect}
        />

        <button onClick={this.onButtonClick}>Create reminder</button>

        <RemindersList filteredReminders={filteredReminders}/> 

        <Filter />
      </>
    )
  }
}

export default App;