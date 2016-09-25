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

var Summoner = (function (_React$Component) {
  _inherits(Summoner, _React$Component);

  function Summoner(props) {
    _classCallCheck(this, Summoner);

    _get(Object.getPrototypeOf(Summoner.prototype), "constructor", this).call(this, props);

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
          _react2["default"].createElement(
            "h1",
            { className: "errorText" },
            "An error occurred in displaying this page! Please refresh!"
          )
        )
      )
    };
  }

  _createClass(Summoner, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var winners = this.props.winResult.map(function (player) {
        return _react2["default"].createElement(
          "div",
          { className: "innerWrapper" },
          _react2["default"].createElement(
            "h4",
            null,
            " ",
            player.playerOrTeamName,
            " "
          ),
          _react2["default"].createElement(
            "h5",
            null,
            "percentage: ",
            Math.round(player.wins / (player.wins + player.losses) * 10000) / 100,
            "%"
          ),
          _react2["default"].createElement(
            "h5",
            null,
            "Games: ",
            player.wins + player.losses
          )
        );
      });

      var streakers = this.props.hotResult.map(function (player) {
        return _react2["default"].createElement(
          "div",
          { className: "innerWrapper" },
          _react2["default"].createElement(
            "h4",
            null,
            " ",
            player.playerOrTeamName,
            " "
          ),
          _react2["default"].createElement(
            "h5",
            null,
            "percentage: ",
            Math.round(player.wins / (player.wins + player.losses) * 10000) / 100,
            "%"
          ),
          _react2["default"].createElement(
            "h5",
            null,
            "Games: ",
            player.wins + player.losses
          )
        );
      });

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
              this.props.name,
              " on DUOmacia!"
            ),
            _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/normalize.css", media: "screen", title: "no title", charset: "utf-8" }),
            _react2["default"].createElement("link", { rel: "stylesheet", href: "/stylesheets/summoner.css", media: "screen", title: "no title", charset: "utf-8" })
          ),
          _react2["default"].createElement(
            "body",
            null,
            _react2["default"].createElement(
              "div",
              { className: "headingBox" },
              _react2["default"].createElement(
                "a",
                { href: "../../" },
                "Home"
              ),
              _react2["default"].createElement(
                "h1",
                null,
                "Hello, ",
                this.props.name,
                "!"
              ),
              _react2["default"].createElement(
                "h2",
                null,
                "Here are your results:"
              )
            ),
            _react2["default"].createElement(
              "div",
              { className: "leftBox" },
              _react2["default"].createElement(
                "h3",
                null,
                "Winning Players!"
              ),
              winners
            ),
            _react2["default"].createElement("img", { className: "Logo", src: "/images/Duomacia2.svg", alt: "Duomacia's official logo. Says the words DUOmacia with very fancy text!" }),
            _react2["default"].createElement(
              "div",
              { className: "rightBox" },
              _react2["default"].createElement(
                "h3",
                null,
                "Hot Streak Players!"
              ),
              streakers
            ),
            _react2["default"].createElement(
              "a",
              { className: "", href: "/summoner/" + this.props.name + "/loading" },
              _react2["default"].createElement(
                "div",
                { className: "suggestedBox" },
                _react2["default"].createElement(
                  "h3",
                  null,
                  "Find Suggested Players!"
                ),
                _react2["default"].createElement(
                  "p",
                  null,
                  "Suggested players lists the winrates you have had with all players you have played with. It is the most recommended feature of this site. However, due to Riot API's rate limiting it may take some time."
                ),
                _react2["default"].createElement(
                  "h3",
                  null,
                  "Estimated time for completion is: ",
                  this.props.waitTime,
                  " "
                )
              )
            ),
            _react2["default"].createElement("script", { type: "text/javascript", src: "/javascripts/summoner.js" })
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

  return Summoner;
})(_react2["default"].Component);

exports["default"] = Summoner;
module.exports = exports["default"];
//# sourceMappingURL=summoner.js.map