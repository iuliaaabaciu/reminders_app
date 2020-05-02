const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'developer',
    password : 'Maimuta1993!',
    database : 'reminders'
  }
});

const createUsers = (name, familyName, email) => 
  knex("users").insert({ name, familyName, email });

const reminderManager = (userId, category, dateCreated, sendEmailDate, sendEmailHour) => 
knex("reminders").insert({ userId, category, dateCreated, sendEmailDate, sendEmailHour });

  

const listUsers = () => 
  knex.select("id", "name", "familyName", "email")
  .from("users");  

const listReminders = () => 
  knex.select('id', 'userId', 'category', 'dateCreated', 'scheduledDate')
  .from('reminders');


const run = async() => {
  await createUsers("d", "f", "123@1234.com");
  const users = await listUsers();
  const reminders = await listReminders();
  const userId = users[0].id;
  await reminderManager(userId, 'Food', '2020-04-25', '2020-04-26', '08:00:00')
console.log(users, reminders)
}  

run();