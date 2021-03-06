const express = require('express');
const bcrypt = require('bcrypt');
const accessToken = require('./accessToken');
const { body, validationResult, sanitizeBody } = require('express-validator');
const authMiddleware = require('./authMiddleware');
const remindersDatabase = require('./remindersLogic');
const usersDatabase = require('./usersLogic');

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors())

app.get('/home', function(req, res) {
  res.json();
});

// USERS
app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/^(\w+)/).withMessage('Password must be at least 5 chars long'),
  body('firstName').matches(/^(\w+)/),
  body('lastName').matches(/^(\w+)/),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

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

app.delete('/reminders', authMiddleware, async(req, res) => {
  const userId = req.params.userId;
  await remindersDatabase.deleteAllReminders(userId);
  res.json();
})

//update
app.put('/reminders/updateReminder', authMiddleware, async (req, res) => {
  const { id, text } = req.body;

  await remindersDatabase.updateReminder(id, req.user.id, text);
  res.json();
})

app.put('/reminders/updateDateScheduled', authMiddleware, async (req, res) => {
  const { id, dateScheduled } = req.body; 

  await remindersDatabase.updateDateScheduled(id, req.user.id, dateScheduled);
  res.json();
})

app.listen(8080);