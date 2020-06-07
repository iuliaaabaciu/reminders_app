const config = require('./config');
const knex = require("knex")(config);
const nodemailer = require('nodemailer');
const express = require('express');
const remindersDatabase = require('./remindersLogic');
const usersDatabase = require('./usersLogic');
const moment = require('moment');

const now = moment().format('YYYY-MM-DD hh:mm:ss');

const query = () =>
  knex('users')
    .join('reminders', 'users.id', '=', 'reminders.userId')
    .select('users.email', 'reminders.text', 'reminders.category', 'reminders.dateScheduled')
    .where('reminders.dateScheduled', '=', '2020-07-04 08:20:00');

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

    let mailOptions = {
      from: 'lurline.cremin@ethereal.email',
      to: data[i].email, 
      subject: 'You have a new reminder', 
      text: data[i].text, 
      html: '"<b>Hello world?</b>"'
    };
   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });    
  }
}  

sendEmail();