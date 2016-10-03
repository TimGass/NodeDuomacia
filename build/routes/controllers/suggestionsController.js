"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function SuggestionsController(cookies, socket, callback) {
  var limit = require("simple-rate-limiter");
  var requestLib = require("request");
  var dc = false;
  var ourRequest = function ourRequest(url, callback) {
    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (dc) {
      return;
    }
    setTimeout(function () {
      return requestLib({ url: url, forever: true, pool: { maxSockets: Infinity } }, callback);
    }, timeout);
  };
  var request = limit(ourRequest).to(3000).per(10000);
  var result = undefined;
  var status = undefined;
  var url = undefined;
  var matchList = undefined;
  var winners = [];
  var losers = [];
  var matchArray = [];
  var displayName = "";
  var id = undefined;
  var wait = 0;
  var count = 0;
  var urlArray = [];

  socket.on("disconnect", function () {
    dc = true;
  });

  var dataHandler3 = function dataHandler3() {
    var notMeFilter = function notMeFilter(name) {
      return name !== displayName;
    };
    winners = winners.filter(notMeFilter);
    losers = losers.filter(notMeFilter);
    var arrayCounter = function arrayCounter(list) {
      var listCount = {};
      for (var x = 0; x < list.length; x++) {
        if (listCount[list[x]]) {
          listCount[list[x]] += 1;
        } else {
          listCount[list[x]] = 1;
        }
      }
      return listCount;
    };
    var loseCount = arrayCounter(losers);
    var winCount = arrayCounter(winners);
    var winCountMap = function winCountMap(player, keyIndex) {
      var mixed = false;
      Object.keys(loseCount).forEach(function (playerLoss, keyIndexLoss) {
        if (playerLoss === player) {
          mixed = true;
        }
      });
      if (mixed) {
        return { name: player, wins: winCount[player], losses: loseCount[player] };
      }
      return { name: player, wins: winCount[player] };
    };
    var loseCountFilter = function loseCountFilter(player) {
      return !winCount.hasOwnProperty(player);
    };
    var loseCountMap = function loseCountMap(player) {
      return { name: player, losses: loseCount[player] };
    };
    var winMapped = Object.keys(winCount).map(winCountMap);
    var loseCountFiltered = Object.keys(loseCount).filter(loseCountFilter);
    var loseMapped = loseCountFiltered.map(loseCountMap);
    var total = winMapped.concat(loseMapped);
    var totalMap = function totalMap(player) {
      var totalNum = 0;
      var winNum = 0;
      if (player.hasOwnProperty("wins")) {
        totalNum += player.wins;
        winNum += player.wins;
      }
      if (player.hasOwnProperty("losses")) {
        totalNum += player.losses;
      }
      var ratio = winNum / totalNum;
      player.total = totalNum;
      player.ratio = ratio;
      player.percentage = Math.round(ratio * 10000) / 100;
      return player;
    };
    var totalMapped = total.map(totalMap);
    var percentageSort = function percentageSort(a, b) {
      if (b.percentage === a.percentage) {
        return b.total - a.total;
      }
      return b.percentage - a.percentage;
    };
    totalMapped.sort(percentageSort);
    var prefferedFilter = function prefferedFilter(player) {
      return player.total > 2 && player.ratio > .55;
    };
    var lessPrefferedFilter = function lessPrefferedFilter(player) {
      return player.ratio >= .5;
    };
    var preffered = totalMapped.filter(prefferedFilter);
    var lessPreffered = totalMapped.filter(lessPrefferedFilter);
    if (dc) {
      return;
    }
    if (wait !== 0) {
      (function () {
        var interval = setInterval(function () {
          if (wait === 0) {
            clearInterval(interval);
            return callback({ preffered: preffered, lessPreffered: lessPreffered, totalMapped: totalMapped, displayName: displayName });
          }
        }, 1000);
      })();
    } else {
      return callback({ preffered: preffered, lessPreffered: lessPreffered, totalMapped: totalMapped, displayName: displayName });
    }
  };
  var dataHandler2 = function dataHandler2() {
    matchArray.forEach(function (match, number) {
      var winteam = undefined;
      var losePlayersId = [];
      var winPlayersId = [];
      match.teams.forEach(function (team) {
        if (team.winner) {
          winteam = team.teamId;
        }
      });
      match.participants.forEach(function (player) {
        if (player.teamId === winteam) {
          winPlayersId.push(player.participantId);
        } else {
          losePlayersId.push(player.participantId);
        }
      });
      match.participantIdentities.forEach(function (participant) {
        winPlayersId.forEach(function (partId) {
          if (participant.participantId === partId) {
            if (participant.player.summonerId === id) {
              match.participantIdentities.forEach(function (partWin) {
                winPlayersId.forEach(function (partWinId) {
                  if (partWin.participantId === partWinId) {
                    winners.push(partWin.player.summonerName);
                  }
                });
              });
            }
          }
        });
        losePlayersId.forEach(function (partId) {
          if (participant.participantId === partId) {
            if (participant.player.summonerId === id) {
              match.participantIdentities.forEach(function (partLose) {
                losePlayersId.forEach(function (partLoseId) {
                  if (partLose.participantId === partLoseId) {
                    losers.push(partLose.player.summonerName);
                  }
                });
              });
            }
          }
        });
      });
    });
    return dataHandler3();
    if (dc) {
      return;
    }
  };
  var dataHandler1 = function dataHandler1() {
    var matchListMap = function matchListMap(match) {
      return match.matchId;
    };
    var matchIdList = matchList.matches.map(matchListMap);
    // create a list of match IDs, instead of details. We really only care
    // about IDs, so we can make requests to find out the specifics.
    matchIdList.forEach(function (match, number) {
      // on the last iteration of the forEach function, we want to
      // run all of the dependent code, upon request completion
      if (dc) {
        return;
      }
      url = "https://na.api.pvp.net/api/lol/na/v2.2/match/" + match + "?api_key=RGAPI-185B94BD-6063-4F75-81CB-B5D98501B146";
      _getter = function (err, response, data) {
        if (!response) {
          request(response.request.uri.href, _getter);
        } else {
          if (response.statusCode > 310) {
            console.error(response.statusCode);
            if (response.statusCode === 429) {
              if (response.headers.hasOwnProperty("retry-after")) {
                request(response.request.uri.href, _getter, response.headers.retry - after * 1000);
              } else {
                request(response.request.uri.href, _getter, 5000);
              }
            } else if (response.statusCode === 404) {
              console.log("request:" + (count + 1) + " / " + matchIdList.length);
              //DO NOTHING!
              count++;
              if (count === matchIdList.length) {
                console.log("finished!");
                return dataHandler2();
              }
            } else {
              request(response.request.uri.href, _getter, 5000);
            }
          } else {
            console.log("request:" + (count + 1) + " / " + matchIdList.length);
            result = JSON.parse(data);
            status = response.statusCode;
            matchArray.push(result);
            // if the request returns valid information, push it on to
            // the matchlist. If not, don't do anything.
            // in an ideal world, we would capture everything, but for
            // our purposes, it is okay if we drop a match or two
            // not to mention, reloading the page is not that hard,
            // if for some reason there is a server or connection
            // error, with Riot.
            count++;
            if (count === matchIdList.length) {
              console.log("finished!");
              return dataHandler2();
            }
          }
        }
      };
      request(url, _getter);
    });
  };

  // hoist variables to keep them in the global scope
  id = Number(cookies.id);
  displayName = cookies.displayName;
  // fill out variables, given previous searches with cookies, making sure
  // that it is the same as the person they are searching for
  // this allows us to skip a large part of the process down below,
  // letting us know their ID and that the account exists and is ranked.
  // So, we make less requests and speed up the process.
  url = "https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + id + "?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5&seasons=SEASON2016&api_key=RGAPI-185B94BD-6063-4F75-81CB-B5D98501B146";
  // TODO: change this url every time there is a new season, so that results
  // will be current with year.
  // make a request to get a list of all the match IDs that the user has
  // played in ranked this year.

  var _getter = function getter(err, response, data) {
    if (response.statusCode > 310) {
      console.error(response.statusCode);
      if (response.statusCode === 429) {
        if (response.headers.hasOwnProperty("retry-after")) {
          request(response.request.uri.href, _getter, response.headers.retry - after * 1000);
        } else {
          request(response.request.uri.href, _getter, 5000);
        }
      } else if (response.statusCode === 404) {
        return res.redirect("../../../error/404");
      } else {
        request(response.request.uri.href, _getter, 5000);
      }
    } else {
      matchList = JSON.parse(data);
      return dataHandler1();
      if (dc) {
        return;
      }
    }
  };
  return request(url, _getter);
};

exports["default"] = SuggestionsController;
module.exports = exports["default"];
//# sourceMappingURL=suggestionsController.js.map