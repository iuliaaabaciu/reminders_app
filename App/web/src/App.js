import React from 'react';
import Filter from './Filter';
import RemindersList from './RemindersList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      reminders: [],
      dateScheduled: new Date(),
    }
  }

  dateChange = date => {
    this.setDateScheduled({ dateScheduled: date })
  }

  render() {
    return(
      <>
        <input type="text" 
          placeholder="Create your reminder"
        />

        <DatePicker selected={this.state.dateScheduled}
          onChange={ this.setDateScheduled }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <select><option value="">Choose city...</option><option value="New York">New York</option><option value="London">London</option><option value="Amsterdam">Amsterdam</option><option value="Cluj">Cluj</option><option value="Paris">Paris</option></select>

        <RemindersList /> 

        <Filter />
      </>
    )
  }
}

export default App;