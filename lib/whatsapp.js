const { TWILIO: { ACCOUNT_SID, AUTH_TOKEN, FROM_NUMBER, TO_NUMBER } } = require('../environment').config();

const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

exports.sendMessage = function (message, number) {
  return twilio.messages.create({
    from: `${ FROM_NUMBER }`,
    body: message,
    to: `${ number }`
  });
}
