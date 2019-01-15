const emailConfig = {
  apiKey: process.env.EMAIL_API_KEY,
  domain: process.env.EMAIL_DOMAIN
}
const mailgun = require('mailgun-js')(emailConfig)

exports.sendEmail = (recipient, message, attachment) =>
  new Promise((resolve, reject) => {
    const data = {
      from: 'MYA <mya-admin@myadventure.com>',
      to: recipient,
      subject: message.subject,
      text: message.text,
      inline: attachment,
      html: message.html
    }

    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
