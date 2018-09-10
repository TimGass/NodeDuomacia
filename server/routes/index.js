var express = require('express');
var router = express.Router();
import controller from './controllers/welcomeController';

/* GET home page. */
router.get('/', function(req, res, next) {
  controller(req, res);
});

module.exports = router;
