var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  let controller = require("./controllers/searchController.js");
  controller(req, res);
});

module.exports = router;
