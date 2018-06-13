'use strict'
const _Client = require('../Controllers/Firebase');
const translate = require('google-translate-api');
const Crypto = require('crypto');
//Conseguir usuario por Id
function GetUser(req, res) {
  //if(_Client.auth.)
  _Client.admin.auth().getUser(req.params.Id)
    .then(function (userRecord) {
      res.status(200).send('User: ' + JSON.stringify({ displayName: userRecord.displayName, phoneNumber: userRecord.phoneNumber, email: userRecord.email}));
    })
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}

//Crear Usuario nuevo
function CreateUser(req, res) {
  _Client.admin.auth().createUser({
    email: req.body.Email,
    emailVerified: false,
    phoneNumber: req.body.Celular,
    password: req.body.Password,
    displayName: req.body.Nombre,
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      _Client.Users.child(userRecord.uid).set({Auth: encrypt(req.body.Password)});
      res.status(200).send('User Creado: ' + userRecord.uid); 
    })
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}

//Actualiza Usuario
function UpdateUser(req, res) {
  _Client.admin.auth().updateUser(req.params.Id, {
    email: req.body.Email,
    emailVerified: false,
    phoneNumber: req.body.Celular,
    password: req.body.Password,
    displayName: req.body.Nombre,
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      _Client.Users.child(userRecord.uid).update({Auth: encrypt(req.body.Password)});
      res.status(200).send('User Actualizado: ' + JSON.stringify({ displayName: userRecord.displayName, phoneNumber: userRecord.phoneNumber, email: userRecord.email }));
    })
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}

//Actualiza Usuario
function DeleteUser(req, res) {
  _Client.admin.auth().deleteUser(req.params.Id)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.status(200).send('User Eliminado');
    })
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}

//Login
function Login(req, res) {
  _Client.admin.auth().getUserByEmail(req.body.Email)
    .then(function (userRecord) {
      _Client.Users.child(userRecord.uid).on('value', function(snapshot) {
        res.status(200).send(snapshot.val());
      });
    })
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}

//Salir
function SignOut(req, res) {

}

function encrypt(text){
  return Crypto.createHmac('sha256', "secret").update(text).digest('base64');
}
module.exports = { GetUser, CreateUser, UpdateUser, DeleteUser, Login, SignOut }