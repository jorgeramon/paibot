const { getQueue } = require('./lib/queue');
const notification = require('./lib/notification');

const queue = getQueue();

queue.process(async function (job) {

  const ad = job.data;

  try {
    const response = await notification.sendMessage(ad);
    job.progress(100);
  } catch (e) {
    console.error('\n--------------------------------------------------------');
    console.error(`ERROR [${ ad.uid }]`);
    console.error('Couldn\'t be sent...');
    console.error(e.message);

    throw e;
  }
});
