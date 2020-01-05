const Bull = require('bull');
const { UI, setQueues } = require('bull-board');
const { MONITOR: { PORT } } = require('./environment').config();

const { getQueue } = require('./lib/queue');
setQueues(getQueue());

const app = require('express')();

app.use('/', UI);

app.listen(PORT, function () {
  console.log(`Listening port ${ PORT }...`);
});
