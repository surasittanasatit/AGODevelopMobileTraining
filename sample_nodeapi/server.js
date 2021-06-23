var express = require('express'),
  app = express(),
  port = process.env.PORT || 12900,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routesAPi.js'); //importing route
routes(app); //register the route

app.listen(port)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});