"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var WelcomeLayout = (function (_React$Component) {
  _inherits(WelcomeLayout, _React$Component);

  function WelcomeLayout(props) {
    _classCallCheck(this, WelcomeLayout);

    _get(Object.getPrototypeOf(WelcomeLayout.prototype), "constructor", this).call(this, props);

    this.state = {
      jsx: _react2["default"].createElement(
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
          _react2["default"].createElement("img", { src: "/images/loading.gif", alt: "Loading icon. Please wait!" })
        )
      )
    };
  }

  _createClass(WelcomeLayout, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        jsx: _react2["default"].createElement(
          "html",
          null,
          _react2["default"].createElement(
            "head",
            null,
            _react2["default"].createElement("meta", { charset: "utf-8" }),
            _react2["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            _react2["default"].createElement(
              "title",
              null,
              "DUOmacia"
            ),
            _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/normalize.css", media: "screen", title: "no title", charset: "utf-8" }),
            _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/welcome.css", media: "screen", title: "no title", charset: "utf-8" })
          ),
          _react2["default"].createElement(
            "body",
            null,
            _react2["default"].createElement(
              "div",
              { className: "container" },
              _react2["default"].createElement(
                "div",
                { className: "hero" },
                _react2["default"].createElement("img", { className: "Logo", src: "/images/Duomacia2.svg", alt: "Duomacia's official logo. Says the words DUOmacia with very fancy text!" }),
                _react2["default"].createElement("img", { className: "GarenImg", src: "/images/GoodEnough.svg", alt: "Garen, the might of demacia! Large man, with giant armor and a massive sword! DEMACIA!!!" })
              ),
              _react2["default"].createElement(
                "label",
                { "for": "search" },
                "Please input the account you wish to search:"
              ),
              _react2["default"].createElement(
                "form",
                { className: "search", action: "/search", method: "post" },
                this.props.children,
                _react2["default"].createElement(
                  "button",
                  { type: "submit", name: "submit" },
                  "Forge onwards!"
                )
              )
            ),
            _react2["default"].createElement(
              "footer",
              null,
              _react2["default"].createElement(
                "p",
                null,
                "DUOmacia is a free website meant to be used by players. No distribution or use of images, code, or other material is approved, except by respective owners."
              )
            ),
            _react2["default"].createElement("script", { type: "text/javascript", src: "/javascripts/welcome.js" })
          )
        )
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.jsx;
    }
  }]);

  return WelcomeLayout;
})(_react2["default"].Component);

exports["default"] = WelcomeLayout;
module.exports = exports["default"];
//# sourceMappingURL=welcomeLayout.js.map