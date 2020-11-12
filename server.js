const winston = require('winston');
const express = require('express');
var app = express();

require('./startup/logging.js')();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();
require('./startup/prod.js')(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

var port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;