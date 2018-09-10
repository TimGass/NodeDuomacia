var express = require('express');
var router = express.Router();
import controller from './controllers/searchController';

/* GET home page. */
router.post('/', function(req, res, next) {
  controller(req, res);
});

module.exports = router;
