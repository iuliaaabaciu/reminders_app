import React from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import CreateReminder from './CreateReminder';
import RemindersList from './RemindersList';
import { createReminder, listReminders, updateReminder, updateDateScheduled, deleteReminder } from './reminders';
import moment from 'moment';
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
    const date = moment(reminderObj.dateScheduled).format('YYYY-MM-DD hh:mm:ss');
    console.log({date})
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
    const dateScheduled = moment(updatedDate.dateScheduled).format('YYYY-MM-DD hh:mm:ss');
    await updateDateScheduled(updatedDate.reminderId, dateScheduled);
    const reminders = await listReminders();
    this.setState({ reminders: reminders });
  }

  handleDeleteReminder = async (id) => {
    await deleteReminder(id);
    const reminders = await listReminders();
    this.setState({ reminders: reminders });
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
    const now = moment().locale('ro').format('YYYY-MM-DD');
    if (filter === 'ALL') {
      return reminders;
    }
 
    if (filter === 'TODAY') {
      return reminders.filter((element) => {   
          const scheduled = moment(element.dateScheduled).format('YYYY-MM-DD');
          return (moment(now).isSame(scheduled));
      })
    }

    if (filter === 'THIS WEEK') {
      return reminders.filter((element) => { 
          const scheduled = moment(element.dateScheduled, 'YYYY-MM-DD');
          return (moment(now).isSame(scheduled, 'week'));
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
        <div className="nav">
          <ul id="menu">
            <li><Link to="/home" className="link">Homepage</Link></li>
            <button className="logout link" onClick={this.logOut}>Log Out</button>
          </ul>
        </div>  

        <div className="container">
          <CreateReminder onButtonClick={this.handleCreateReminder} />
          <RemindersList 
            filteredReminders={filteredReminders}
            updateReminder={this.handleUpdateReminder}
            updateDateScheduled={this.handleUpdateDateScheduled}
            deleteReminder={this.handleDeleteReminder}
          /> 
          <Filter
            setFilterToAll={this.setFilterToAll}
            setFilterToToday={this.setFilterToToday}
            setFilterToThisWeek={this.setFilterToThisWeek}
          />
        </div>
      </>
    )
  }
}

export default RemindersComp;