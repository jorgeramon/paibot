const cron = require('node-cron');

module.exports = function (callback) {
  if (process.env.DISABLE_CRON) {
    setTimeout(function () {
      callback();
    });
  } else {
    cron.schedule('*/3 * * * *', callback);
  }
}
