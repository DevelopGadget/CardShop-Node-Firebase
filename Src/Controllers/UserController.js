'use strict'
const _Client = require('../Controllers/Firebase');
const translate = require('google-translate-api');

//Conseguir usuario por Id
function GetUser(req, res) {
  //if(_Client.auth.)
  _Client.auth().getUser(req.params.Id)
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
  _Client.auth().createUser({
    email: req.body.Email,
    emailVerified: false,
    phoneNumber: req.body.Celular,
    password: req.body.Password,
    displayName: req.body.Nombre,
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
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
  _Client.auth().updateUser(req.params.Id, {
    email: req.body.Email,
    emailVerified: false,
    phoneNumber: req.body.Celular,
    password: req.body.Password,
    displayName: req.body.Nombre,
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
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
  _Client.auth().deleteUser(req.params.Id)
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
  _Client.auth().getUserByEmail(req.body.Email)
    .then(function (userRecord) {
      if(userRecord.Password == req.body.Password){
        res.status(200).send("Hola");
      }
      res.status(200).send(userRecord.passwordHash+"    "+userRecord.passwordSalt);
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
  firebase.auth().signOut()
    .catch(function (error) {
      translate(error.errorInfo.message, { to: 'es' }).then(Response => {
        res.status(400).send(Response.text);
      }).catch(err => {
        res.status(400).send(error.errorInfo.message);
      });
    });
}
module.exports = { GetUser, CreateUser, UpdateUser, DeleteUser, Login, SignOut }