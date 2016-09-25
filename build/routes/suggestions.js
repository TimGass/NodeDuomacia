'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:summoner/suggestions', function (req, res, next) {
  res.redirect('loading');
});

module.exports = router;
//# sourceMappingURL=suggestions.js.map