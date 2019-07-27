require('dotenv').config();
const moment = require('moment');
const { demoUsername, demoPassword } = require('./config');

const guestUserId = 1;
const now = moment().format('YYYY-MM-DD HH:mm:ss+00').toString();
const past = moment().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss+00').toString();

function randomHour() {
  const hours = 24 * Math.random();
  return moment().add(hours, 'hours').format('YYYY-MM-DD HH:mm:ss+00').toString();
}

function randomDay(maxDays = 90) {
  const days = (maxDays - 1) * Math.random() + 1;
  return moment().add(days, 'days').format('YYYY-MM-DD HH:mm:ss+00').toString();
}

const demoUser = {
    userId: guestUserId,
    username: demoUsername,
    password: demoPassword,
  };

demoUser.entries = [
  { // RELEASED CARDS
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Use (+) sign to create a timelocked entry',
    content: 'A user opens an entry form and enters a piece of information to lock away, along with a general description of that information so the user has a reference for what was stored.  The user then sets a release date, which is the date when the information will become accessible.  Once the submit button is selected, the information is stored remotely on a database and will be inaccessible to everyone, including the user, until the release date has passed.',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Platforms',
    content: 'Timelockr is currently configured for use on desktop and tablet computers.  However, viewing on desktop enables a console that displays actions taken by the server in response to your interactions with the client.\n\nOh yeah, there is also a bug that causes a white screen on some Apple tablets but not others when opening certain user forms.  So for an optimal interaction, please view the app on a desktop computer.',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Please feel free!',
    content: '> To delete released and locked entries\n> To add new locked entries\n> To add unlocked entries (by not setting a release date)\n> to extend release dates for currently locked entries',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Clicking on a released entry card...',
    content: '...will automatically copy the content of the entry to the clipboard.',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Who\'s gonna turn down a Junior Mint?',
    content: 'It\'s chocolate, it\'s peppermint, it\'s delicious!',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Tabs are swipable, clickable, and...',
    content: '...use kinetic scrolling for an intuitive navigation experience. Swipe left to view the \'locked\' cards, the content of which is not viewable until the card\'s timer runs out.',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Set a timer for a minute...',
    content: 'When time runs out, the locked card will switch from the Locked card stack to the Unlocked, and the information will be made available for copy/pasting.',
    type: 'lockedDemoCard',
  },
  { // LOCKED CARDS
    userId: guestUserId,
    creationDate: now,
    releaseDate: randomHour(),
    description: 'How much wood, a woodchuck could chuck.',
    content: '',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: randomHour(),
    description: 'Timers with less than 24 hours remaining update by the second',
    content: '',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: randomHour(),
    description: 'Timers longer than a day and less than a month update by the minute',
    content: '',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: randomHour(),
    description: 'Cards with more than a month remaining are static',
    content: '',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: randomDay(-5),
    releaseDate: randomDay(),
    description: 'What I would do for a Klondike bar',
    content: '',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: randomDay(-5),
    releaseDate: randomDay(),
    description: 'What I did last summer',
    content: '',
    type: null,
  },
];

module.exports = demoUser;
