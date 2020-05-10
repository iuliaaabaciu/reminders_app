import axios from 'axios';

export const listReminders = async () => {
  const result = await axios.get('http://localhost:8080/reminders');
  return result.data;
}

export const createReminder = (userId, text, category, dateScheduled) => {
  return axios.post('http://localhost:8080/reminders', {
    userId: userId,
    text: text, 
    category:category, 
    dateScheduled: dateScheduled,
  })
}