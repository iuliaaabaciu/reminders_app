import React from 'react';
import DatePicker from "react-datepicker";

class CreateReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      dateScheduled: new Date(),
      category: '',
    }
  }

  onInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue: inputValue });
  }

  onDateChange = (date) => {
    this.setState({ dateScheduled: date });
  } 

  onCategorySelect = (event) => { 
    this.setState({ category: event.target.value})
  }  

  sendCreatedReminder = () => {
    const remindersInfo = this.state;
    this.props.onButtonClick(remindersInfo);
  }

  render() {
    return (
      <div className="box">
        <input className="input"
          type="text" 
          placeholder="Create your reminder"
          value={this.state.inputValue}
          onChange={this.onInputChange}
        />
        
        <DatePicker className="datepickerInputContainer datepickerWrapper input"
          selected={this.state.dateScheduled}
          onChange={ this.onDateChange }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <select className="input" value={this.state.category} onChange={this.onCategorySelect}>
          <option value="">Choose a category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Books">Books</option>
        </select>  

        <button className="button" onClick={this.sendCreatedReminder}>Create reminder</button>
      </div>

    )
  }
}

export default CreateReminder;