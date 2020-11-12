const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const cookieParser = require('cookie-parser');

const home = require('../routes/api/home');
const login = require('../routes/api/login');
const signup = require('../routes/api/signup');

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());

  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(serveStatic(__dirname + '/dist'));
  app.use(history());

  app.use(express.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(cookieParser());

  app.use('/api/home', home);
  app.use('/api/login', login);
  app.use('/api/signup', signup);

  app.use(error);
}