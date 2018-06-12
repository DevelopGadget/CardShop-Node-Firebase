'use strict'

var User = require('../Controllers/UserController');

module.exports = function (app){
  app.get('/User/Get/:Id', User.GetUser);
  app.post('/User/Post', User.CreateUser);
  app.post('/User/Login', User.Login);
  app.put('/User/Put/:Id', User.UpdateUser);
  app.delete('/User/Delete/:Id', User.DeleteUser);
}