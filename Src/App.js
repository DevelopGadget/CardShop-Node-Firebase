const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');

//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(morgan('dev'));
app.use(body.json());

//Listen
app.listen(app.get('port'), () => {
  console.log('Iniciado');
});