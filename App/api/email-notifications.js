const config = require('./config');
const knex = require("knex")(config);
const nodemailer = require('nodemailer');
const moment = require('moment');
const schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.hour = 8;
//rule.minute = 7;

const now = moment().format('YYYY-MM-DD 07:00:00');

const query = () =>
  knex('users')
    .join('reminders', 'users.id', '=', 'reminders.userId')
    .select('users.email', 'reminders.text', 'reminders.category', 'reminders.dateScheduled')
    .where('reminders.dateScheduled', '>', now);

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'lurline.cremin@ethereal.email',
    pass: 'JYAJGrayHpTV2Gbx9k',
  },
});

const sendEmail = async () => {
  const data = await query();

  for (let i = 0; i < data.length; i++) {

    const output = `
      <p>You have a new reminder set for today</p>
      <h3>Reminder</h3>
      <ul>  
        <li>Category: <b>${data[i].category}</b></li>
        <li>Scheduled at: <b>${data[i].dateScheduled}</b></li>
        <li>Your reminder is: <b>${data[i].text}</b></li>
      </ul>
    `;
    const mailOptions = {
      from: 'lurline.cremin@ethereal.email',
      to: data[i].email, 
      subject: 'New reminder alert', 
      text: 'New reminder alert', 
      html: output,
    };
   
    let j = schedule.scheduleJob(rule, function() {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });   
    });

    } 

}  
sendEmail();

