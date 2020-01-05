const { getQueue } = require('./lib/queue');
const whatsapp = require('./lib/whatsapp');

const queue = getQueue();

queue.process(async function (job) {

  const ad = job.data;

  try {
    const response = await whatsapp.sendMessage(`
${ad.title}
${ad.price}
${ad.location}
${ad.time}

${ad.description}

${ad.link}`, ad.to);
    job.progress(100);
  } catch (e) {
    console.error('\n--------------------------------------------------------');
    console.error(`ERROR [${ ad.uid }]`);
    console.error('Couldn\'t be sent through whatsapp...');
    console.error(e.message);

    throw e;
  }
});
