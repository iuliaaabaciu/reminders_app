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
    this.setState({ inputValue: inputValue })
  }

  onDateChange = (date) => {
    this.setState({ dateScheduled: date })
  } 

  onCategorySelect = (event) => { 
    this.setState({ category: event.target.value})
  }  

  someFn = () => {
    const remindersInfo = this.state;
    this.props.onButtonClick(remindersInfo);
  }

  render() {
    return (
      <>
        <input type="text" 
          placeholder="Create your reminder"
          value={this.state.inputValue}
          onChange={this.onInputChange}
        />

        <DatePicker selected={this.state.dateScheduled}
          onChange={ this.onDateChange }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <select value={this.state.category} onChange={this.onCategorySelect}>
          <option value="">Choose a category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Books">Books</option>
        </select>  

        <button onClick={this.someFn}>Create reminder</button>

      </>

    )
  }
}

export default CreateReminder;