import limit from "simple-rate-limiter";
import requestLib from "request";
import Token from "../../token.js";

function SuggestionsController(cookies, socket, callback){
  let dc = false;
  let ourRequest = (url, callback, timeout = 0) => {
     if(dc){
      return;
     }
    setTimeout(() => { return requestLib({ url: url, forever: true, pool: { maxSockets: Infinity } }, callback); }, timeout);
  };
  let request = limit(ourRequest).to(3000).per(10000);
  let result;
  let status;
  let url;
  let matchList = { matches: [] };
  let winners = [];
  let losers = [];
  let matchArray = [];
  let displayName = "";
  let id;
  let wait = 0;
  let count = 0;


  socket.on("disconnect", () => {
    dc = true;
  });

  let dataHandler3 = async () => {
    let notMeFilter = (name) => {
      return name !== displayName;
    };
    winners = winners.filter(notMeFilter);
    losers = losers.filter(notMeFilter);
    let arrayCounter = async (list) => {
      let listCount = {};
      for(var x = 0; x < list.length; x++){
        if(list[x] in listCount){
          listCount[list[x]] += 1;
        }
        else {
          listCount[list[x]] = 1;
        }
        if (x === list.length - 1) {
          console.log(listCount);
          return listCount;
        }
      }
    }
    const loseCount = await arrayCounter(losers);
    const winCount = await arrayCounter(winners);
    console.log(winCount);
    let winCountMap = (player, keyIndex) => {
      let mixed = false;
      Object.keys(loseCount).forEach((playerLoss, keyIndexLoss) => {
        if(playerLoss === player){
          mixed = true;
        }
      });
      if(mixed){
        return { name: player, wins: winCount[player], losses: loseCount[player] };
      }
      return { name: player, wins: winCount[player] };
    };
    let loseCountFilter = (player) => {
      return !winCount.hasOwnProperty(player);
    }
    let loseCountMap = (player) => {
      return { name: player, losses: loseCount[player] };
    };
    let winMapped = Object.keys(winCount).map(winCountMap);
    let loseCountFiltered = Object.keys(loseCount).filter(loseCountFilter);
    let loseMapped = loseCountFiltered.map(loseCountMap);
    let total = winMapped.concat(loseMapped);
    let totalMap = (player) => {
      let totalNum = 0;
      let winNum = 0;
      if(player.hasOwnProperty("wins")){
        totalNum += player.wins;
        winNum += player.wins;
      }
      if(player.hasOwnProperty("losses")){
        totalNum += player.losses;
      }
      let ratio = winNum / totalNum;
      player.total = totalNum;
      player.ratio = ratio;
      player.percentage = Math.round(ratio * 10000)/100;
      return player;
    };
    let totalMapped = total.map(totalMap);
    let percentageSort = (a, b) => {
      if(b.percentage === a.percentage){
        return b.total - a.total;
      }
      return b.percentage - a.percentage;
    };
    totalMapped.sort(percentageSort);
    let prefferedFilter = (player) => {
      return (player.total >= 2) && (player.ratio > .55);
    };
    let lessPrefferedFilter = (player) => {
      return (player.ratio >= .5);
    };
    let preffered = totalMapped.filter(prefferedFilter);
    let lessPreffered = totalMapped.filter(lessPrefferedFilter);
    if(dc){
      return;
    }
    if(wait !== 0){
      let interval = setInterval(() => {
        if(wait === 0){
          clearInterval(interval);
          return callback({ preffered: preffered, lessPreffered: lessPreffered, totalMapped: totalMapped, displayName: displayName });
        }
      }, 1000);
    }
    else {
      return callback({ preffered: preffered, lessPreffered: lessPreffered, totalMapped: totalMapped, displayName: displayName });
    }
  };
  let dataHandler2 = () => {
    let matchIdArray = [];
    matchArray.forEach((match) => {
      matchIdArray.push(match.gameId);
    });
    let log = {};
    matchIdArray.forEach((item, key) => {
      if((matchIdArray.indexOf(item) !== key || (matchIdArray.indexOf(item, key + 1) !== -1)) && matchIdArray.indexOf(item) !== -1 ){
        if(log[item]){
          return log[item]++;
        }
        return log[item] = 1;
      }
    });
    if(Object.keys(log).length > 0){
      Object.keys(log).forEach((matchId) => {
        matchArray.forEach((item, key) => {
          if(Number(matchId) === item.gameId){
            console.log(matchArray[key]);
            matchArray.splice(key, log[matchId]);
          }
        })
      });
    }
    matchArray.forEach((match, number) => {
      let winteam;
      let losePlayersId = [];
      let winPlayersId = [];
      match.teams.forEach((team) => {
        if(team.win === "Win"){
          winteam = team.teamId;
        }
      });
      match.participants.forEach((player) => {
        if(player.teamId === winteam){
          winPlayersId.push(player.participantId);
        }
        else{
          losePlayersId.push(player.participantId);
        }
      });
      match.participantIdentities.forEach((participant) => {
        winPlayersId.forEach((partId) => {
          if(participant.participantId === partId){
            if(participant.player.accountId === id){
              match.participantIdentities.forEach((partWin) => {
                if(partWin.participantId === partId){
                  winners.push(partWin.player.summonerName);
                }
              });
            }
          }
        });
        losePlayersId.forEach((partId) => {
          if(participant.participantId === partId){
            if(participant.player.accountId === id){
              match.participantIdentities.forEach((partLose) => {
                losePlayersId.forEach((partLoseId) => {
                  if(partLose.participantId === partLoseId){
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
    if(dc){
      return;
    }
  };
  let dataHandler1 = () => {
    let matchListMap = (match) => {
      return match.gameId;
    };
    let matchIdList = matchList.matches.map(matchListMap);
    // create a list of match IDs, instead of details. We really only care
    // about IDs, so we can make requests to find out the specifics.
    matchIdList.forEach((match, number) => {
      // on the last iteration of the forEach function, we want to
      // run all of the dependent code, upon request completion
      if(dc){
        return;
      }
      url = `https://na1.api.riotgames.com/lol/match/v3/matches/${match}?api_key=${Token}`;
      let getter = (err, response, data) => {
        if(!response){
          request(url, getter);
        }
        else {
          if(response.statusCode > 310){
            console.error(response.statusCode);
            if(response.statusCode === 429){
              if(response.headers.hasOwnProperty("retry-after")){
                request(response.request.uri.href, getter, (response.headers.retry-after * 1000));
              }
              else {
                request(response.request.uri.href, getter, 5000);
              }
            }
            else {
              request(response.request.uri.href, getter, 5000);
            }
          }
          else {
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
            if(count === matchIdList.length){
              console.log("finished!");
              return dataHandler2();
            }
          }
        }
      };
      request(url, getter);
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
  url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?queue=420&queue=440&api_key=${Token}`;
  // TODO: change this url every time there is a new season, so that results
  // will be current with year.
  // make a request to get a list of all the match IDs that the user has
  // played in ranked this year.
  let customGetter = (err, response, data) => {
    let dataObj = JSON.parse(data);
    if (response.statusCode > 310) {
      console.log(response.request.uri.href);
      console.error(response.statusCode);
      status = response.statusCode
      dc = true;
      return callback(`../../../error/${status}`);
    }
    else if (dataObj.totalGames > dataObj.endIndex) {
      url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${id}?queue=420&queue=440&beginIndex=${dataObj.endIndex}&api_key=${Token}`;
      matchList.matches = matchList.matches.concat(dataObj.matches);
      return request(url, customGetter);
    }
    else {
      matchList.matches = matchList.matches.concat(dataObj.matches);
      if (dc) {
        return;
      }
      return dataHandler1();
    }
  };

  return request(url, customGetter);
};

export default SuggestionsController;
