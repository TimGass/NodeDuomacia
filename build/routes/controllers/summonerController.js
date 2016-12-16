"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _tokenTokenJs = require("../../token/token.js");

function SummonerController(req, res) {
  var status = undefined;
  var result = undefined;
  var dataHandler1 = undefined;
  var dataHandler2 = undefined;
  var truename = decodeURIComponent(req.params.summoner).toLowerCase().replace(/[\s,.\/;'\[\]\\=`<>?:\"{}|_+~!@#$%^&*()-]/gm, "");
  if (truename.length === 0) {
    status = 404;
    return res.redirect("../error/" + status);
  }
  var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + truename + "?api_key=" + _tokenTokenJs.Token;
  (0, _request2["default"])(url, function (err, response, data) {
    if (err && response.statusCode > 310) {
      console.error(err);
    }
    result = JSON.parse(data);
    status = response.statusCode;
    dataHandler1();
  });
  dataHandler1 = function () {
    if (status > 310) {
      return res.redirect("../error/" + status);
    }
    var displayName = result[truename].name;
    var id = result[truename].id;
    var idResult = undefined;
    var idStatus = undefined;
    url = "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + id + "?api_key=" + _tokenTokenJs.Token;
    (0, _request2["default"])(url, function (err, response, data) {
      if (err && response.statusCode > 310) {
        console.error(err);
      }
      idResult = JSON.parse(data);
      idStatus = response.statusCode;
      dataHandler2();
    });
    dataHandler2 = function () {
      if (idStatus === 404) {
        return res.redirect("../error/unranked");
      } else if (idStatus > 310) {
        return res.redirect("../error/" + idStatus);
      }
      var percentageSort = function percentageSort(a, b) {
        if (Math.round(b.wins / (b.wins + b.losses) * 10000) / 100 === Math.round(a.wins / (a.wins + a.losses) * 10000) / 100) {
          return b.wins + b.losses - (a.wins + a.losses);
        }
        return Math.round(b.wins / (b.wins + b.losses) * 10000) / 100 - Math.round(a.wins / (a.wins + a.losses) * 10000) / 100;
      };
      idResult[id][0].entries.sort(percentageSort);
      var hotFilter = function hotFilter(player) {
        return player.isHotStreak;
      };
      var winFilter = function winFilter(player) {
        var total = player.wins + player.losses;
        var ratio = player.wins / total;
        return ratio > .55 && total > 50;
      };
      var hotResult = idResult[id][0].entries.filter(hotFilter);
      var winResult = idResult[id][0].entries.filter(winFilter);
      res.cookie('id', id, { maxAge: 2592000, httpOnly: true });
      res.cookie('displayName', displayName, { maxAge: 2592000, httpOnly: true });

      // fill out variables, given previous searches with cookies, making sure
      // that it is the same as the person they are searching for
      // this allows us to skip a large part of the process down below,
      // letting us know their ID and that the account exists and is ranked.
      // So, we make less requests and speed up the process.
      url = "https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + id + "?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5&seasons=SEASON2016&api_key=" + _tokenTokenJs.Token;
      // TODO: change this url every time there is a new season, so that results
      // will be current with year.
      // make a request to get a list of all the match IDs that the user has
      // played in ranked this year.

      (0, _request2["default"])(url, function (err, response, data) {
        if (response.statusCode > 310) {
          console.error(response.statusCode);
          return res.redirect("../error/" + idStatus);
        }
        var matchList = JSON.parse(data);
        var waitTime = _moment2["default"].duration(matchList.matches.length / 3000 * 10500 + 10000).humanize();
        res.cookie('waitTime', matchList.matches.length / 3000 * 10500 + 10000, { maxAge: 2592000, httpOnly: false });
        return res.render("summoner", { winResult: winResult, hotResult: hotResult, name: req.params.summoner, waitTime: waitTime });
      });
    };
  };
}

exports["default"] = SummonerController;
module.exports = exports["default"];
//# sourceMappingURL=summonerController.js.map