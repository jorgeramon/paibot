const cron = require('node-cron');
const searchEngine = require('./search-engine');
const whatsapp = require('./whatsapp');
const model = require('./database');

// Every 3 minutes
cron.schedule('*/3 * * * *', async function () {
  console.log('Searching...');

  const response = await searchEngine.search();

  const ads = await model.find({ uid: { $in: response.map(x => x.uid) } }).exec();
  const ads_uid = ads.map(x => x.uid);

  const pending = response.filter(x => ads_uid.indexOf(x.uid) === -1);

  if (pending.length) {
    console.log(`Found ${ pending.length } new ads!`);
  } else {
    console.log('No ads found :(');
  }

  pending.sort((x,y) => y.timestamp - x.timestamp);

  for (let ad of pending) {
    try {
      await new model(ad).save();
    } catch (e) {
      console.error(`${ad.uid} couldn't be saved!`);
      continue;
    }

    try {
      await whatsapp.sendMessage(`
*${ad.title}*
*${ad.price}*
_${ad.location}_
_${ad.time}_

${ad.description}

${ad.link}
      `);
    } catch (e) { console.error(`${ad.uid} couldn't be sent`) }
  }
});
