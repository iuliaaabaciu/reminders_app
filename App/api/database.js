const config = require('./config');
const knex = require("knex")(config);

exports.createUsers = (name, familyName, email) => 
  knex("users").insert({ name, familyName, email });

exports.reminderManager = (userId, category, dateCreated, sendEmailDate, sendEmailHour) => 
  knex("reminders").insert({ userId, category, dateCreated, sendEmailDate, sendEmailHour });

exports.listUsers = () => 
  knex.select("id", "name", "familyName", "email")
  .from("users");  

exports.listReminders = () => 
  knex.select('id', 'userId', 'category', 'dateCreated', 'sendEmailDate', 'sendEmailHour')
  .from('reminders');