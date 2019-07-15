/*
  • This script requires a .pg_service.conf file to be
    located in the home directory with the following
    contents:
      [tldb]
      dbname=postgres
      host=localhost
      port=5432
      user=jeh
      password=1445

  • Users should be logging in under user credentials,
    not with 'jeh'

  • Dev server needs to be running
*/

// ENVIRONMENT
require('dotenv').config();

// DEPENDENCIES
const axios = require('axios');
const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const Promise = require('bluebird');

// VARIABLES
const fixedEntries = 50;
const minEntries = 0;
const maxEntries = 0;
const numOfUsers = 30;

let fileFormattedCredentials = '';
let entries = [];
let users = [];

// FUNCTIONS (ABC)
function aTimeLaterToday() {
  const now = moment();
  const midnight = moment().endOf('hour');
  let timeInBetween = faker.date.between(now, midnight);
  timeInBetween = moment(timeInBetween).format('YYYY-MM-DD HH:mm:ss+00');
  return timeInBetween;
}

function generateUsers(numOfUsers, users = []) {
  const demo_user = {
    userId: 1,
    username: 'guest@timelockr-demo.com',
    password: 'password',
  }
  users.push(demo_user);

  for (let i = 2; i <= numOfUsers; i += 1) {
    const user = {
      userId: i,
      username: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
}

function generateEntries(users, fixedEntries, minEntries, maxEntries) {
  let numOfUserEntries;

  if (fixedEntries) {
    numOfUserEntries = fixedEntries;
  }
  users.forEach((user) => {
    if (!fixedEntries) {
      numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });
    }
    const entries = [];
    for (let e = 0; e < numOfUserEntries; e += 1) {
      const creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss+00');
      const releaseDate = Math.random() < 0.5
        ? aTimeLaterToday()
        : moment(faker.date.future()).format('YYYY-MM-DD HH:mm:ss+00');
      const entry = {
        userId: user.userId,
        creationDate,
        releaseDate,
        description: faker.lorem.words(
          Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1),
        ),
        content: faker.lorem.sentence(),
      };
      entries.push(entry);
    }
    user.entries = entries;
  });

  return users;
}

function formatCredentialsAsString(usersCredentials) {
  const concatCred = (accumCreds, user) => (
    `${accumCreds}\nusername: '${user.username}',\npassword: '${user.password}',\n`
  );
  return usersCredentials.reduce(concatCred, '');
}

function getAllEntries(users) {
  const entries = [];
  users.forEach((user) => {
    user.entries.forEach((entry) => {
      entries.push(entry);
    });
  });
  return entries;
}

function writeDataToFile(data) {
  console.log(data);
  fs.writeFile('fake-credentials.data', data, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('Mock user credentials written to \'fake-credentials.data\'');
  });
}

// MAIN
console.clear();

faker.seed(123);
users = generateUsers(numOfUsers);
console.table(users);

fileFormattedCredentials = formatCredentialsAsString(users);
writeDataToFile(fileFormattedCredentials);

users = generateEntries(users, fixedEntries, minEntries, maxEntries);
entries = getAllEntries(users);

console.table(entries);
console.log(process.env.API_HOST)
Promise.each(
  users, user => axios.post(
    `${process.env.API_HOST}/api/db/signup`,
    { username: user.username, password: user.password },
  )
    .then(() => console.log(user.username, user.password))
    .then(() => (Promise.each(
      user.entries,
      entry => axios.post(`${process.env.API_HOST}/api/db/entries`, {
        userId: entry.userId,
        creationDate: entry.creationDate,
        releaseDate: entry.releaseDate,
        description: entry.description,
        content: entry.content,
      })
        .then(() => console.log(
          entry.userId,
          entry.creationDate,
          entry.releaseDate,
          entry.description,
          entry.content,
        )),
    ))).then(() => console.log('done')),
  ).catch(err => console.log(err));


