'use strict'
const _Client = require('../Controllers/Firebase');

function GetUser(req, res){
  _Client.auth().getUser(req.params.Id)
  .then(function(userRecord) {
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
}

module.exports = {GetUser}