const config = require('./config');
const knex = require("knex")(config);

exports.createReminder = (userId, category, dateScheduled) => 
  knex("reminders").insert({ userId, category, dateScheduled });

exports.listReminders = () => 
  knex.select('id', 'userId', 'category', 'dateCreated', 'dateScheduled')
  .from('reminders');

exports.deleteReminder = (id) => 
  knex("reminders")  
    .where({ id })
    .del();

exports.deleteAllReminders = (userId) => 
  knex("reminders")  
    .where({ userId })
    .del();