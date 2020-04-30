const config = require('./config');
const knex = require("knex")(config);

exports.listUsers = () => 
  knex.select("id", "firstName", "lastName", "email")
  .from("users");    

exports.createUsers = (name, lastName, email) => 
  knex("users").insert({ name, lastName, email });

exports.createReminder = (userId, category, dateScheduled) => 
  knex("reminders").insert({ userId, category, dateScheduled });

exports.listReminders = () => 
  knex.select('id', 'userId', 'category', 'dateCreated', 'scheduledDate')
  .from('reminders');