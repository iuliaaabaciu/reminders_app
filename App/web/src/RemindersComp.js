import React from 'react';
import Filter from './Filter';
import CreateReminder from './CreateReminder';
import RemindersList from './RemindersList';
import { createReminder, listReminders, updateReminder, updateDateScheduled } from './reminders';
import moment from 'moment';
import { toDate, parseISO, format, differenceInDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { deleteUser, deleteAuthToken } from "./session";

class RemindersComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      reminders: [],
      category: '',
      filter: 'ALL',
    }
  }

  async componentDidMount() {
    const reminders = await listReminders();
    this.setState({ reminders: reminders });
  }

  handleCreateReminder = async (reminderObj) => {
    const date = format(reminderObj.dateScheduled, 'yyyy-MM-dd hh:mm:ss');
    console.log(this.state);
    await createReminder(reminderObj.inputValue, reminderObj.category, date);
    const reminders = await listReminders();
    // alert('Reminder was successfully created');
    this.setState({ reminders: reminders, inputValue: '' });
  }

  handleUpdateReminder = async (updatedReminder) => {
    await updateReminder(updatedReminder.reminderId, updatedReminder.reminderValue);
    const reminders = await listReminders();
    this.setState({ reminders: reminders }); 
  }

  handleUpdateDateScheduled = async (updatedDate) => {
    const dateScheduled = format(updatedDate.dateScheduled, "yyyy-MM-dd hh:mm:ss")
    await updateDateScheduled(updatedDate.reminderId, dateScheduled);
    const reminders = await listReminders();
    this.setState({ reminders: reminders })
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
    const fns = toDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    console.log(typeof fns);
    console.log( fns);

    if (filter === 'ALL') {
      return reminders;
    }
 
    if (filter === 'TODAY') {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD HH:MM:SS');
          const fnssch = parseISO(toDate(format(new Date(element.dateScheduled), 'yyyy-MM-dd hh:mm:ss')));
          const d=differenceInDays(fnssch, now);
          // console.log(typeof fnssch);
          // console.log( d);
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

  logOut = () => {
    deleteUser();
    deleteAuthToken();
    this.props.history.push("/signIn");
  }

  render() {
    const filteredReminders = this.filterReminders(this.state.reminders, this.state.filter);

    return(
      <>
        <CreateReminder onButtonClick={this.handleCreateReminder} />
        <RemindersList 
          filteredReminders={filteredReminders}
          updateReminder={this.handleUpdateReminder}
          updateDateScheduled={this.handleUpdateDateScheduled}
        /> 
        <Filter 
          setFilterToAll={this.setFilterToAll}
          setFilterToToday={this.setFilterToToday}
          setFilterToThisWeek={this.setFilterToThisWeek}
        />

        <button onClick={this.logOut}>Log Out</button>
      </>
    )
  }
}

export default RemindersComp;