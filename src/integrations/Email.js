import dotenv from 'dotenv';
import request from 'request-promise-native';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  send: async () => {
    let response = await request({
      url: 'https://api.sendgrid.com/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        personalizations: [{
          to: [{
            email: `chieze.franklin@gmail.com`,
            name: 'Chieze Franklin'
          }],
          subject: 'Just Testing SendGrid'
        }],
        content: [{
          type: 'text/html',
          value: 'This is <em>just</em> a test content'
        }],
        from: {
          email: `no-reply@livepulse.com`,
          name: 'Live Pulse'
        },
        reply_to: {
          email: `no-reply@livepulse.com`,
          name: 'Live Pulse'
        },
        mail_settings: {
          footer: {
            enable: false,
            html: 'This is the <b>footer</b>'
          }
        }
      },
      json: true,
      resolveWithFullResponse: true
    });
    return response.body;
  }
}