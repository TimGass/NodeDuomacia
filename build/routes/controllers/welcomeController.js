"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function WelcomeController(req, res) {
  if (req.cookies.displayName) {
    var displayName = req.cookies.displayName;
    res.render("welcome", { displayName: displayName });
  } else {
    res.render("welcome");
  }
}

exports["default"] = WelcomeController;
module.exports = exports["default"];
//# sourceMappingURL=welcomeController.js.map