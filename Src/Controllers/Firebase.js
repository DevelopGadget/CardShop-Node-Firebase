'use strict'

var admin = require('firebase-admin');

var serviceAccount = require('../example-node-8324d-firebase-adminsdk-1o7n1-f156caf956.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://example-node-8324d.firebaseio.com'
});

const Users = admin.database().ref("Users");
const Data = admin.database().ref("Data");

module.exports = {admin, Data, Users};