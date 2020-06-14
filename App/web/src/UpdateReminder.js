import React from 'react';
import DatePicker from "react-datepicker";

class UpdateReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderId: '',
      reminderValue: '',
      dateScheduled: '',
    }
  }

  onInputChange = (event, id) => {
    this.setState({ reminderValue: event.target.value, reminderId: id})
  }

  onInputKeypress = () => {
    const updatedReminder = this.state;
    this.props.updateReminder(updatedReminder);
  }

  onDateChange = (date, id) => {
    this.setState(
      { dateScheduled: date, reminderId: id }, 
      () => this.updateDate()
    );
  }
  
  updateDate = () => {
    const updatedDateScheduled = this.state;
    this.props.updateDateScheduled(updatedDateScheduled);
  }

  render() {
    return (
      <>
        <input className="remList"
          defaultValue={this.props.defaultValue}
          onChange={(e) => this.onInputChange(e, this.props.elementId)}
          onKeyPress={this.onInputKeypress}
        />
        
        <DatePicker className="datepickerInputContainer remList remDateUpdate"
          selected={ new Date(this.props.dateScheduled) }
          onChange={ (date) => this.onDateChange(date, this.props.elementId) }
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

export default UpdateReminder;