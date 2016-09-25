"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function SearchController(req, res) {
  if (req.body.search) {
    res.redirect("../summoner/" + req.body.search);
  } else {
    res.redirect("../error/empty");
  }
}

exports["default"] = SearchController;
module.exports = exports["default"];
//# sourceMappingURL=searchController.js.map