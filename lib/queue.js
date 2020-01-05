const { REDIS: { PORT, HOST } } = require('../environment').config();
const Bull = require('bull');
const queue = new Bull('segunda_mano', {
  limiter: { max: 1, duration: 5000 },
  settings: {
    redis: { port: PORT, host: HOST }
  }
});

exports.getQueue = function () {
  return queue;
}

exports.add = function (data) {
  const jobId = `${data.to}:${data.uid}`
  return queue.add(data, { jobId });
}
