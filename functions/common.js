const sgMail = require('@sendgrid/mail')


module.exports = {
  generateOTP: function generateOTP(length = 4) {
    var digits = "0123456789";
    var OTP = "";
    for (let i = 1; i <= length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    if (OTP.startsWith('0')) {
      OTP = generateOTP(length)
    }

    return OTP;
  },
  sendMail: (data) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'jenish@closedigit.com', // Change to your recipient
      from: 'sagar@closedigit.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error.response.body)
      })
  }
}