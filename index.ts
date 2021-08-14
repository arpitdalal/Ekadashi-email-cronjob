require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const nodemailer = require('nodemailer');
const moment = require('moment');

const app = express();

let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const ekadashis = [
  {'date': 'August 13, 2021', 'title': 'Saphala Ekadashi'},
  {'date': 'January 13, 2021', 'title': 'Saphala Ekadashi'},
]

cron.schedule('0 0 * * *', function() {
  console.log('---------------------');
  console.log('Running Cron Job');

  const todaysDate = new Date();
  const todaysFormattedDate = moment(todaysDate).format('MMMM DD, YYYY');

  ekadashis.forEach(ekadashi => {
    if (todaysFormattedDate == ekadashi.date) {
      let messageOptions = {
        from: 'arpitdalalm@gmail.com',
        to: 'arpitdalalm@gmail.com',
        subject: 'Today\'s Ekadashi',
        text: `Hello! This is a reminder that today is ${ekadashi.title}!`
      };

      transporter.sendMail(messageOptions, function(error: any) {
        if (error) {
          throw error;
        } else {
          console.log('Email successfully sent!');
        }
      });

      console.log(ekadashi);
    }
  })
});

app.listen(3000);