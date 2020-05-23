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
    console.log(this.props.dateScheduled)
  }

  onInputKeypress = () => {
    const updatedReminder = this.state;
    this.props.updateReminder(updatedReminder);
  }

  onDateChange = (event, id) => {
    this.setState({ dateScheduled: event.target.value, reminderId: id })
  }

  render() {
    return (
      <>
        <input 
          defaultValue={this.props.defaultValue}
          onChange={(e) => this.onInputChange(e, this.props.elementId)}
          onKeyPress={this.onInputKeypress}
        />
        
        <DatePicker 
         //selected={this.props.dateScheduled}
          onChange={ this.onDateChange }
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