var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/:summoner/suggestions', function(req, res, next) {
  let yolo = JSON.parse(req.body.data);
  res.render("suggestions", { preffered: yolo.preffered, lessPreffered: yolo.lessPreffered, totalMapped: yolo.totalMapped, displayName: yolo.displayName });
});

module.exports = router;
