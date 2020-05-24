const config = require('./config');
const knex = require("knex")(config);

exports.createReminder = (userId, text, category, dateScheduled) => 
  knex("reminders").insert({ userId, text, category, dateScheduled });

exports.listReminders = () => 
  knex.select('id', 'userId', 'text', 'category', 'dateCreated', 'dateScheduled')
  .from('reminders');

exports.deleteReminder = (id) => 
  knex("reminders")  
    .where({ id })
    .del();

exports.deleteAllReminders = (userId) => 
  knex("reminders")  
    .where({ userId })
    .del();

exports.updateReminder = (id, text) => 
  knex("reminders")
    .where({ id })
    .update({ text });    

exports.updateDateScheduled = (id, dateScheduled) => 
  knex("reminders")
    .where({ id })
    .update({ dateScheduled });    