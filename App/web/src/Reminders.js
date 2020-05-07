import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Reminders extends React.Component {
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

        
      </>
    )
  }
}

export default Reminders;