'use strict'
const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');

//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(morgan('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

require('./Routes/Routes')(app);

//Listen
app.listen(app.get('port'), () => {
  console.log('Iniciado ' + app.get('port'));
});