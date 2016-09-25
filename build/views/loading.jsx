"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var Loading = (function (_React$Component) {
  _inherits(Loading, _React$Component);

  function Loading(props) {
    _classCallCheck(this, Loading);

    _get(Object.getPrototypeOf(Loading.prototype), "constructor", this).call(this, props);
    this.state = {
      time: "0 minutes remaining"
    };
  }

  _createClass(Loading, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        time: _moment2["default"].duration(this.props.waitTime).humanize()
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "html",
        null,
        _react2["default"].createElement(
          "head",
          null,
          _react2["default"].createElement("meta", { charset: "utf-8" }),
          _react2["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
          _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/normalize.css", media: "screen", title: "no title", charset: "utf-8" }),
          _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/loading.css", media: "screen", title: "no title", charset: "utf-8" }),
          _react2["default"].createElement(
            "title",
            null,
            "Loading"
          )
        ),
        _react2["default"].createElement(
          "body",
          null,
          _react2["default"].createElement(
            "h3",
            null,
            "This may take a few minutes"
          ),
          _react2["default"].createElement(
            "div",
            { className: "imageBorder" },
            _react2["default"].createElement("img", { src: "/images/loading.gif", alt: "Loading icon. Please wait!" })
          ),
          _react2["default"].createElement(
            "h3",
            { className: "waitTime" },
            " Estimated time remaining: ",
            this.state.time,
            " "
          ),
          _react2["default"].createElement("form", { method: "post", action: "suggestions", className: "form" }),
          _react2["default"].createElement("script", { type: "text/javascript", src: "/socket.io/socket.io.js" }),
          _react2["default"].createElement("script", { type: "text/javascript", src: "/javascripts/loading.js" })
        )
      );
    }
  }]);

  return Loading;
})(_react2["default"].Component);

exports["default"] = Loading;
module.exports = exports["default"];
//# sourceMappingURL=loading.js.map