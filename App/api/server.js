const express = require('express');
const bcrypt = require('bcrypt');
const accessToken = require('./accessToken');
const authMiddleware = require('./authMiddleware');
const remindersDatabase = require('./remindersLogic');
const usersDatabase = require('./usersLogic');

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors())

// USERS
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  await usersDatabase.register(firstName, lastName, email, hashedPassword);
  res.json();
})

app.post('/login', async(req, res) => {
  const { email, password } = req.body;

  const user = await usersDatabase.login(email);
  if (!user) {
    res.status(401).json( { message: 'Invalid credentials.' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) { 
    res.status(401).json({ message: 'Invalid password.' });
  }

  const authToken = accessToken.generateAccessToken(user);
  res.json({ authToken, user });
});

// REMINDERS
app.get('/reminders', authMiddleware, async (req, res) => {
  const listReminders = await remindersDatabase.listReminders(req.user.id);
  res.json(listReminders);
})

app.post('/reminders', authMiddleware, async(req, res) => {
  const { text, category, dateScheduled } = req.body;
  await remindersDatabase.createReminder(req.user.id, text, category, dateScheduled);
  res.json(); 
})

app.delete('/reminders/:id', authMiddleware, async(req, res) => {
  const id = req.params.id;
  await remindersDatabase.deleteReminder(id);
  res.json();
})

app.delete('/reminders/deleteAllReminders/:userId', authMiddleware, async(req, res) => {
  const userId = req.params.userId;
  await remindersDatabase.deleteAllReminders(userId);
  res.json();
})

//update
app.put('/reminders/updateReminder/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  await remindersDatabase.updateReminder(id, req.user.id, text);
  res.json();
})

app.put('/reminders/updateDateScheduled/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { dateScheduled } = req.body; 

  await remindersDatabase.updateDateScheduled(id, req.user.id, dateScheduled);
  res.json();
})

app.listen(8080);