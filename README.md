Send alerts via email if BTC price is greater than a certain value (in $).

![Screenshot](https://i.imgur.com/VJQErrM.png)

## How to configure
You need to have a [SendGrid](http://sendgrid.com) account to send emails.

After cloning this repo and installing dependencies, create `.env` file which will hold the configuration values.
```sh
$ git clone https://github.com/Edmeral/btc-alert
$ cd btc-alert
$ npm install
$ touch .env
```
#### .env file
Edit the .env file with the corresponding values.
```
SENDGRID_API_KEY=your SendGrid api key
TO_EMAIL=recipient address (yours)
FROM_EMAIL=sender's email (you may put yours here)
CAP=send email if value greater than this (example: 400)
INTERVAL=how many minutes to wait before checking the price again, example: 60 (for checking every hour)
```

#### Starting the price checker
```sh
$ npm start
```

#### Running it as a daemon
If you want to run this in the background (as a daemon), check out [pm2](https://www.npmjs.com/package/pm2).
