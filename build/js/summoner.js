"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var flag = true;
var hoverflag = true;

var Hover = (function () {
  function Hover(options, reverse) {
    _classCallCheck(this, Hover);

    this.options = options;
    this.reverse = reverse;
    this.flag = true;

    this.run = this.run.bind(this);
  }

  _createClass(Hover, [{
    key: "run",
    value: function run(event) {
      var _this = this;

      if (this.flag) {
        this.flag = false;
        (0, _jquery2["default"])(event.currentTarget).animate(this.options, 270, "linear", function () {
          (0, _jquery2["default"])(event.currentTarget).animate(_this.reverse, 270, "linear", function () {
            _this.flag = true;
          });
        });
      }
    }
  }]);

  return Hover;
})();

;

var MinMax = (function () {
  function MinMax(object, options, styleout, reverse, stylein, hover) {
    _classCallCheck(this, MinMax);

    this.options = options;
    this.reverse = reverse;
    this.styleout = styleout;
    this.stylein = stylein;
    this.flag = true;
    this.hover = hover;
    this.object = object;

    this.minimize = this.minimize.bind(this);
    this.maximize = this.maximize.bind(this);
  }

  _createClass(MinMax, [{
    key: "maximize",
    value: function maximize(event) {
      var _this2 = this;

      if (this.flag) {
        this.flag = false;
        this.styleout(event);
        (0, _jquery2["default"])(event.currentTarget).animate(this.options, 500, "linear", function () {
          _this2.object.off("mouseover", _this2.hover.run);
          _this2.object.off("click", _this2.maximize);
          _this2.object.on("click", _this2.minimize);
          _this2.flag = true;
        });
      }
    }
  }, {
    key: "minimize",
    value: function minimize(event) {
      var _this3 = this;

      if (this.flag) {
        this.flag = false;
        this.stylein(event);
        (0, _jquery2["default"])(event.currentTarget).animate(this.reverse, 500, "linear", function () {
          _this3.object.on("mouseover", _this3.hover.run);
          _this3.object.off("click", _this3.minimize);
          _this3.object.on("click", _this3.maximize);
          _this3.flag = true;
        });
      }
    }
  }]);

  return MinMax;
})();

;

var hoverTop = new Hover({ position: "relative", top: "-=30px" }, { top: "+=30px" });
var hoverLeft = new Hover({ position: "relative", left: "-=30px" }, { left: "+=30px" });
var hoverRight = new Hover({ position: "relative", right: "-=30px" }, { right: "+=30px" });
var minmaxLeft = new MinMax((0, _jquery2["default"])("div.leftBox"), {
  width: "55.2vw",
  left: "+=22.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "2px solid #181865");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "32%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "0%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper:nth-of-type(3n+1)").css("margin-left", "2.75%");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "1");
}, {
  width: "21.5258%",
  left: "-=22.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverLeft);

var minmaxRight = new MinMax((0, _jquery2["default"])("div.rightBox"), {
  width: "55.2vw",
  right: "+=22.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "2px solid #FF6400");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "32%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "0%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper:nth-of-type(3n+1)").css("margin-left", "2.75%");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "1");
}, {
  width: "21.5258%",
  right: "-=22.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverRight);

var minmaxLeftMobi = new MinMax((0, _jquery2["default"])("div.leftBox"), {
  width: "83.1%",
  left: "+=8.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "2px solid #181865");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "47%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "1%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "2.75%");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "1");
}, {
  width: "8.73109%",
  left: "-=8.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverLeft);

var minmaxRightMobi = new MinMax((0, _jquery2["default"])("div.rightBox"), {
  width: "83.1%",
  right: "+=8.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "2px solid #FF6400");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "47%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "1%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "2.75%");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "1");
}, {
  width: "8.73109%",
  right: "-=8.4vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverRight);

var minmaxLeftTab = new MinMax((0, _jquery2["default"])("div.leftBox"), {
  width: "56.3vw",
  left: "+=21.8vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "2px solid #181865");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "47%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "0%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "5.25%");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "1");
}, {
  width: "21.5258%",
  left: "-=21.8vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-left", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverLeft);

var minmaxRightTab = new MinMax((0, _jquery2["default"])("div.rightBox"), {
  width: "56.3vw",
  right: "+=21.8vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "2px solid #FF6400");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "47%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "0%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "5.25%");
  (0, _jquery2["default"])("div.rightBox").css("zIndex", "2");
  (0, _jquery2["default"])("div.leftBox").css("zIndex", "1");
}, {
  width: "21.5258%",
  right: "-=21.8vw"
}, function (event) {
  (0, _jquery2["default"])(event.currentTarget).css("border-right", "none");
  (0, _jquery2["default"])(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("width", "90%");
  (0, _jquery2["default"])("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
}, hoverRight);

function suggested(event) {
  this.parentNode.submit();
};

function handlers() {
  if ((0, _jquery2["default"])("div.headingBox h1").css("font-size") === "35px") {
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeftTab.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRightTab.maximize);
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeft.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRight.maximize);
    (0, _jquery2["default"])("div.leftBox").on("click", minmaxLeftMobi.maximize);
    (0, _jquery2["default"])("div.rightBox").on("click", minmaxRightMobi.maximize);
  } else if ((0, _jquery2["default"])("img.Logo").css("margin-top") === "70px") {
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeftMobi.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRightMobi.maximize);
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeft.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRight.maximize);
    (0, _jquery2["default"])("div.leftBox").on("click", minmaxLeftTab.maximize);
    (0, _jquery2["default"])("div.rightBox").on("click", minmaxRightTab.maximize);
  } else {
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeftTab.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRightTab.maximize);
    (0, _jquery2["default"])("div.leftBox").off("click", minmaxLeftMobi.maximize);
    (0, _jquery2["default"])("div.rightBox").off("click", minmaxRightMobi.maximize);
    (0, _jquery2["default"])("div.leftBox").on("click", minmaxLeft.maximize);
    (0, _jquery2["default"])("div.rightBox").on("click", minmaxRight.maximize);
  }
  (0, _jquery2["default"])("div.suggestedBox").on("click", suggested);
}

(0, _jquery2["default"])("div.leftBox").on("mouseover", hoverLeft.run);
(0, _jquery2["default"])("div.rightBox").on("mouseover", hoverRight.run);
handlers();
(0, _jquery2["default"])(window).resize(handlers);
//# sourceMappingURL=summoner.js.map