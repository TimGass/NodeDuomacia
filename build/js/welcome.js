"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

if ((0, _jquery2["default"])("form.search button").css("font-size") === "18px") {
  (0, _jquery2["default"])("form.search input").on("focus", function () {
    (0, _jquery2["default"])("footer").css("position", "relative");
    (0, _jquery2["default"])("footer").css("margin-top", "37px");
  });

  (0, _jquery2["default"])("form.search input").on("blur", function () {
    (0, _jquery2["default"])("footer").css("position", "fixed");
    (0, _jquery2["default"])("footer").css("margin-top", "0px");
  });
}
//# sourceMappingURL=welcome.js.map