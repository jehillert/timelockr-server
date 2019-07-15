const debug = require('./loggers')('HELPERS');
const moment = require('moment');

const sortEntries = (unsorted) => {
  // Database dates are UTC.
  const entries = {};

  entries.locked = [];
  entries.released = [];

  const { locked, released } = entries;
  const todayInISO = new Date().toISOString();
  const present = moment().unix();

  for (const entry of unsorted) {
    const { content, description } = entry;
    const entryId = entry.entry_id;
    const creationDate = entry.creation_date;
    const releaseDate = entry.release_date;

    if (moment(releaseDate).isBefore(todayInISO, 'seconds')) {
      const releasedEntry = {
        entryId,
        description,
        content,
      };

      released.push(releasedEntry);
    } else {
      const past = moment(creationDate).unix();
      const future = moment(releaseDate).unix();
      const fraction = parseFloat(
        ((present - past) / (future - past)).toFixed(2),
      );

      const lockedEntry = {
        entryId,
        description,
        creationDate,
        releaseDate,
        fraction,
      };

      locked.push(lockedEntry);
    }
  }
  debug('\n\nLocked Entries - SORTED\n\n%O', entries.locked);
  debug('\n\nReleased Entries - SORTED\n\n%O', entries.released);
  debug('\n\n');

  return { entries };
};

const getQueryParams = (req) => {
  let queryParams;
  const tableName = req.path.slice(1, req.path.length);
  const fields = Object.keys(req.body);
  const values = Object.keys(req.body).map(key => req.body[key]);

  if (req.method !== 'put') {
    queryParams = [tableName].concat(fields, values);
  } else {
    queryParams = [tableName].concat(fields[0], values[0], fields[1], values[1]);
  }
  return queryParams;
};

module.exports = {
  sortEntries,
  getQueryParams,
};
