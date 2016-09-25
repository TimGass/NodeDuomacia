var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:summoner', function(req, res, next) {
  let controller = require("./controllers/summonerController.js");
  controller(req, res);
});

module.exports = router;
