var express = require('express');
var router = express.Router();
import controller from './controllers/summonerController';

/* GET users listing. */
router.get('/:summoner', function(req, res, next) {
  controller(req, res);
});

module.exports = router;
