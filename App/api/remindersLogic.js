const config = require('./config');
const knex = require("knex")(config);

exports.createReminder = (userId, text, category, dateScheduled) => 
  knex("reminders").insert({ userId, text, category, dateScheduled });

exports.listReminders = (userId) => 
  knex.select('id', 'userId', 'text', 'category', 'dateCreated', 'dateScheduled')
  .where({ userId })
  .from('reminders');

exports.deleteReminder = (id) => 
  knex("reminders")  
    .where({ id })
    .del();

exports.deleteAllReminders = (userId) => 
  knex("reminders")  
    .where({ userId })
    .del();

exports.updateReminder = (id, userId, text) => 
  knex("reminders")
    .where({ id, userId })
    .update({ text });    

exports.updateDateScheduled = (id, userId, dateScheduled) => 
  knex("reminders")
    .where({ id, userId })
    .update({ dateScheduled });    