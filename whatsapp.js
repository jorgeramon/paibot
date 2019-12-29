const environment = require('./environment').config();

const twilio = require('twilio')(environment.TWILIO.ACCOUNT_SID, environment.TWILIO.AUTH_TOKEN);

exports.sendMessage = function (message) {
  return twilio.messages.create({
    from: `whatsapp:${ environment.TWILIO.FROM_NUMBER }`,
    body: message,
    to: `whatsapp:${ environment.TWILIO.TO_NUMBER }`
  });
}
