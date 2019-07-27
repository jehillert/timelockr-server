require('dotenv').config();
const moment = require('moment');
const { demoUsername, demoPassword } = require('./config');

const guestUserId = 1;
const now = moment().format('YYYY-MM-DD HH:mm:ss+00').toString();
const past = moment().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss+00').toString();

function someMinutes(maxTime = 15) {
  let time = maxTime;
  time *= Math.random();
  return moment().add(time, 'minutes').format('YYYY-MM-DD HH:mm:ss+00').toString();
}

function someHours(maxTime = 24) {
  let time = maxTime;
  time *= Math.random();
  return moment().add(time, 'hours').format('YYYY-MM-DD HH:mm:ss+00').toString();
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
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Why did the engineering students leave class early?',
    content: 'They were getting a little ANSI.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Why did the fish get bad grades?',
    content: 'Because it was below sea level!',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Platforms',
    content: 'Timelockr is currently configured for use on desktop and tablet computers.  However, viewing on desktop enables a console that displays actions taken by the server in response to your interactions with the client.\n\nOh yeah, there is also a bug that causes a white screen on some Apple tablets but not others when opening certain user forms.  So for an optimal interaction, please view the app on a desktop computer.',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Did you hear? Two antennas got married.',
    content: 'The wedding was lousy, but the reception was outstanding.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Did you hear about the monkeys who shared an Amazon account?',
    content: 'They were Prime mates.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'How does a computer get drunk?',
    content: 'It takes screenshots.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Siri, where is the best place to hide a body?',
    content: 'Siri: The second page of a Google search.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'What did the football coach say to the broken vending machine?',
    content: 'Give me my quarterback!',
    type: null,
  },
    {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Why did the golfer bring two pairs of pants',
    content: 'In case he got a hole in one!',
    type: null,
  },
   {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'I used to have two kidneys. Then I grew up.',
    content: 'Now I have two adult knees.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'How do you stop a bull from charging',
    content: 'Cancel its credit card',
    type: null,
  },

  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'I had to sell my vacuum cleaner…',
    content: 'It was just collecting dust.',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'How did the barber win the race?',
    content: 'He knew a shortcut!',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'What did the spider do on the computer?',
    content: 'Made a website!',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Why did the PowerPoint Presentation cross the road?',
    content: 'To get to the other slide',
    type: null,
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'What do computers eat for a snack?',
    content: 'Microchips!',
    type: null,
  },
  {
    userId: guestUserId,
    releaseDate: someHours(),
    creationDate: past,
    description: 'What\'s the difference between Mechanical Engineers and Civil Engineers?',
    content: 'Mechanical Engineers build weapons; Civil Engineers build targets.',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Why wouldn’t the shrimp share his treasure?',
    content: 'He was a little shellfish!',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Please feel free!',
    content: '• To delete released and locked entries\n• To add new locked entries\n• To add unlocked entries (by not setting a release date)\n• to extend release dates for currently locked entries',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Clicking on a released entry card...',
    content: '...will automatically copy the content of the entry to the clipboard.',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'What do you call a deer with no eye?',
    content: 'I have no idear.',
    type: null,
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
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Set a timer for a minute...',
    content: 'When time runs out, the locked card will switch from the Locked card stack to the Unlocked, and the information will be made available for copy/pasting.',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Why did the stadium get hot after the game?',
    content: 'All of the fans left!',
    type: 'releasedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: past,
    releaseDate: now,
    description: 'Thank you for viewing my app!',
    content: 'And for your patience.  These were the worst jokes the internet had to offer in the two hours I spent looking for them.\n🙄🙃😁',
    type: null,
  },
  { // LOCKED CARDS
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'How much wood, a woodchuck could chuck.',
    content: '',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Timers with less than 24 hours remaining update by the second',
    content: '',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Timers longer than a day and less than a month update by the minute',
    content: '',
    type: 'lockedDemoCard',
  },
  {
    userId: guestUserId,
    creationDate: now,
    releaseDate: someHours(),
    description: 'Cards with more than a month remaining are static',
    content: '',
    type: 'lockedDemoCard',
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
