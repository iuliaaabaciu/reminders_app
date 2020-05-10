import React from 'react';

const RemindersCategory = (props) => {
  return (
    <select value={props.categroy} onChange={props.onCategorySelect}>
      <option value="">Choose a category</option>
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
      <option value="Books">Books</option>
  </select>    
  )
}

export default RemindersCategory;
