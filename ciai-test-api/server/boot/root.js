'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var currentUser = null;

  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  router.get('/CurrentStatus', function(req, res) {
    res.send(JSON.stringify(currentUser));
  });

  router.post('/Login', function(req, res) {
    this.currentUser = res.json();
  });

  router.post('/Logout', function(req, res){
    this.currentUser = null;
  });

  server.use(router);
};
