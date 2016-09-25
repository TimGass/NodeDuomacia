'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var controller = require("./controllers/welcomeController.js");
  controller(req, res);
});

module.exports = router;
//# sourceMappingURL=index.js.map