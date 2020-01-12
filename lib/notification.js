const { NOTIFICATION: { SENDER, RECEIVER }  } = require('../environment').config();
const path = require('path')
const pug = require('pug');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: SENDER.HOST,
  port: SENDER.PORT,
  secure: SENDER.PORT === 465,
  auth: {
    user: SENDER.EMAIL,
    pass: SENDER.PASSWORD
  }
});

exports.sendMessage = function (ad) {
  return transporter.sendMail({
    from: `${ SENDER.NAME } <${ SENDER.EMAIL }>`,
    to: ad.to,
    subject: `Departamento en ${ ad.location }`,
    html: pug.renderFile(path.resolve(__dirname, './mail-template/template.pug'), ad)
  });
}
