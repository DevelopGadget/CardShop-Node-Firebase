'use strict'

var User = require('../Controllers/UserController');

module.exports = function (app){
  app.get('/User/Get/:Id', User.GetUser);
  app.post('/User/Post', User.CreateUser);
  app.put('/User/Put/:Id', User.UpdateUser);
  app.Delete('/User/Delete/:Id', User.DeleteUser);
}