'use strict'
const _Client = require('../Controllers/Firebase');
const translate = require('google-translate-api');

//Conseguir usuario por Id
function GetUser(req, res){
  _Client.auth().getUser(req.params.Id)
  .then(function(userRecord) {
    res.status(500).send('User: '+userRecord.toJSON());
  })
  .catch(function(error) {
    translate(error.errorInfo.message, {to: 'es'}).then(Response => {
      res.status(400).send(Response.text);
    }).catch(err => {
      res.status(400).send(error.errorInfo.message);
    });
  });
}

//Crear Usuario nuevo
function CreateUser(req, res) {
  _Client.auth().createUser({
    email: req.body.Email,
    emailVerified: false,
    phoneNumber: req.body.Celular,
    password: req.body.Password,
    displayName: req.body.Nombre,
    disabled: false
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    res.status(500).send('User Creado: '+userRecord.uid);
  })
  .catch(function(error) {
    translate(error.errorInfo.message, {to: 'es'}).then(Response => {
      res.status(400).send(Response.text);
    }).catch(err => {
      res.status(400).send(error.errorInfo.message);
    });
  });
}

module.exports = {GetUser, CreateUser}