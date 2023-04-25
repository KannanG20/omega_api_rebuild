const admin = require('firebase-admin');

const serviceAccount = require('./firbaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'hubnex-8d75c.appspot.com',
});

module.exports = admin
