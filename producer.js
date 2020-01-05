const cron = require('./lib/cronjob');
const searchEngine = require('./lib/search-engine');
const whatsapp = require('./lib/whatsapp');
const queue = require('./lib/queue');

cron(async function () {
  console.log(`\n${ new Date() }`);
  console.log('Searching...');

  const response = await searchEngine.search();

  console.log('Adding to queue...');

  for (let ad of response) {
    try {
      await queue.add(ad);
    } catch (e) {
      console.error('\n--------------------------------------------------------');
      console.error(`ERROR [${ ad.uid }]`);
      console.error('Couldn\'t be added to the queue..');
      console.error(e.message);
    }
  }
});
