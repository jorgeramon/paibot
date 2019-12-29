const yaml = require('js-yaml');
const fs = require('fs');

let data = null;

exports.config = function () {
  try {
    if (data)
      return data;

    let fileContents = fs.readFileSync(`./environment/.${ process.env.NODE_ENV ? `${ process.env.NODE_ENV }.` : '' }env.yml`, 'utf8');
    data = yaml.safeLoad(fileContents);

    return data;
  } catch (e) {
    throw new Error('Environment file is needed to run this script...');
  }
}


