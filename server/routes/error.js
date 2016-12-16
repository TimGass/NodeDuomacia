var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:status', function(req, res, next) {
  res.render("welcomeErr", {status: req.params.status});
});

module.exports = router;
