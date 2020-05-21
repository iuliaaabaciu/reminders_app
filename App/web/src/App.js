import React from 'react';
import Filter from './Filter';
import CreateReminder from './CreateReminder';
import RemindersList from './RemindersList';
import { createReminder, listReminders, updateReminder } from './reminders';
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

  handleCreateReminder = async (reminderObj) => {
    const date = moment(reminderObj.dateScheduled).format("YYYY-MM-DD HH:MM:SS");
    await createReminder(3, reminderObj.inputValue, reminderObj.category, date);
    const reminders = await listReminders();
    // alert('Reminder was successfully created');
    this.setState({ reminders: reminders, inputValue: '' });
  }

  handleUpdateReminder = async (updatedReminder) => {
    await updateReminder(updatedReminder.reminderId, updatedReminder.reminderValue);
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
 
    if (filter === 'TODAY') {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD HH:MM:SS');
          return (scheduled.diff(now, 'days') < 1);
      })
    }

    if (filter === 'THIS WEEK') {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD HH:MM:SS');
          return (scheduled.diff(now, 'days') < 8 && scheduled.diff(now, 'days') > 1)
      })
    }
  }

  render() {
    const filteredReminders = this.filterReminders(this.state.reminders, this.state.filter);

    return(
      <>
        <CreateReminder onButtonClick={this.handleCreateReminder} />
        <RemindersList 
          filteredReminders={filteredReminders}
          updateReminder={this.handleUpdateReminder}
        /> 
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