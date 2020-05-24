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

export const updateReminder = (id, text) => 
  axios.put(`http://localhost:8080/reminders/updateReminder/${id}`, { text });

export const updateDateScheduled = (id, dateScheduled) => 
  axios.put(`http://localhost:8080/reminders/updateDateScheduled/${id}`, { dateScheduled });
