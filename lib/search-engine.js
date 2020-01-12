const { SEARCH_ENGINE, NOTIFICATION: { RECEIVER } } = require('../environment').config();
const axios = require('axios');

exports.search = async function () {
  const responses = await Promise.all(SEARCH_ENGINE.AREA.map(x => fetchUrl(x)));
  return responses.reduce((current, response) => [ ...current, ...response ], []);
}

async function fetchUrl(area) {
  const fullUrl = `https://webapi.segundamano.mx/nga/api/v1/public/klfst?area=${area}&category=1040&q=departamento&offset=1&lim=28&lang=es&suborder=-${SEARCH_ENGINE.MAX_PRICE}`;

  const response = await axios({
    method: 'get',
    url: fullUrl
  });

  return processResponse(response);
}

function processResponse(response) {
  const data = response.data;

  return data.list_ads.map(data => ({
    rooms: data.ad.ad_details.rooms ? data.ad.ad_details.rooms.single.label : 'No especificado',
    bathrooms: data.ad.ad_details.bathrooms ? data.ad.ad_details.bathrooms.single.label : 'No especificado',
    size: data.ad.ad_details.size ? data.ad.ad_details.size.single.label : 'No especificado',
    description: data.ad.body,
    uid: data.ad.ad_id,
    price: `${ data.ad.list_price.label } ${ data.ad.list_price.currency }`,
    title: data.ad.subject,
    link: data.ad.share_link,
    time: data.ad.list_time.label,
    timestamp: data.ad.list_time.value,
    location: processLocation(data.ad.locations).join(', '),
    thumbnail: data.ad.thumbnail ? `https://images.segundamano.mx/api/v1/smmx/images/${ data.ad.thumbnail.path }?rule=medium` : '',
    to: RECEIVER.EMAIL
  }));
}

function processLocation(location) {
  if (!Array.isArray(location)) {
    return [];
  }

  return [ ...processLocation(location[0].locations), location[0].label ];
}
