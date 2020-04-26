const express = require('express');
const database = require('./database');

const app = express();
app.use(express.json());

app.get('/reminders', async (req, res) => {
  const listReminders = await database.listReminders();
  res.json(listReminders);
})

app.listen(8080)