'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:summoner', function (req, res, next) {
  var controller = require("./controllers/summonerController.js");
  controller(req, res);
});

module.exports = router;
//# sourceMappingURL=summoner.js.map