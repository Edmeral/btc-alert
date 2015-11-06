var request = require('request');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var dotenv = require('dotenv');
dotenv.load();

var options = { auth: { api_key: process.env.SENDGRID_API_KEY } };
var mailer = nodemailer.createTransport(sgTransport(options));
var email = {
    to: [process.env.TO_EMAIL],
    from: process.env.FROM_EMAIL,
    subject: 'Alert! BTC price is $',
    text: 'Alert sent at '
};

var CAP = process.env.CAP;
var sent = false; // Don't send multiple emails

function checkBTC() {
  request('https://bitpay.com/api/rates/USD', function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var price = JSON.parse(body)['rate'];
      if (price >= CAP && !sent) {
        email.subject += price + '.';
        email.text += (new Date()).toString();

        mailer.sendMail(email, function(err, res){
          if(err)
            return console.log(err);
          sent = true;
          console.log('Email sent!');
        });
      }
    }
  });
}

setInterval(checkBTC, process.env.INTERVAL * 60 * 1000);
