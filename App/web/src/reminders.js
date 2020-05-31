import axios from 'axios';
import { getAuthToken } from './session';

export const listReminders = async () => {
  const result = await axios.get('http://localhost:8080/reminders', {headers: { authToken: getAuthToken() }});

  return result.data;
}

export const createReminder = (text, category, dateScheduled) => {
  return axios.post('http://localhost:8080/reminders', {
      text: text, 
      category:category, 
      dateScheduled: dateScheduled,
    }, 
    { headers: { authToken: getAuthToken() } }
  )
}

export const updateReminder = (id, text) => 
  axios.put(`http://localhost:8080/reminders/updateReminder/${id}`, 
    { text },
    { headers: { authToken: getAuthToken() } }
  );

export const updateDateScheduled = (id, dateScheduled) => 
  axios.put(`http://localhost:8080/reminders/updateDateScheduled/${id}`, 
    { dateScheduled },
    { headers: { authToken: getAuthToken() } }
  );
