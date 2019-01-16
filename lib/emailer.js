const emails = require('./emails')
const emailConfig = {
  apiKey: process.env.EMAIL_API_KEY,
  domain: process.env.EMAIL_DOMAIN
}
const mailgun = require('mailgun-js')(emailConfig)

const sendEmail = (recipient, message, attachment) =>
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

exports.sendEmail = sendEmail

const sendConfirmationEmail = (email, token) => {
  return sendEmail(email, {
    subject: 'Please Confirm your Email',
    html: emails.confirmationEmail(`${process.env.CLIENT_ROOT}/verify?token=${token.token}`)
  })
}

exports.sendConfirmationEmail = sendConfirmationEmail
