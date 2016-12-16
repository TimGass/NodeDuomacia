import request from "request";
import moment from "moment";
import {Token} from "../../token/token.js";

function SummonerController(req, res){
  let status;
  let result;
  let dataHandler1;
  let dataHandler2;
  let truename = decodeURIComponent(req.params.summoner).toLowerCase().replace(/[\s,.\/;'\[\]\\=`<>?:\"{}|_+~!@#$%^&*()-]/gm, "");
  if(truename.length === 0){
    status = 404;
    return res.redirect(`../error/${status}`);
  }
  let url = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${truename}?api_key=${Token}`;
  let getter = (err, response, data) => {
    if(err && response.statusCode > 310){
      console.error(err);
      request(response.request.uri.href, getter, 5000);
    }
    result = JSON.parse(data);
    status = response.statusCode;
    dataHandler1();
  };
  request(url, getter);
  dataHandler1 = ()=> {
    if(status > 310){
      return res.redirect(`../error/${status}`);
    }
    let displayName = result[truename].name;
    let id = result[truename].id;
    let idResult;
    let idStatus;
    url = `https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/${id}?api_key=${Token}`;
    let getter = (err, response, data) => {
      if(!err && response.statusCode > 310){
        console.error(err);
        request(response.request.uri.href, getter, 5000)
      }
      idResult = JSON.parse(data);
      idStatus = response.statusCode;
      dataHandler2();
    };
    request(url, getter);
    dataHandler2 = () => {
      if(idStatus === 404){
        return res.redirect("../error/unranked");
      }
      else if(idStatus > 310){
        return res.redirect(`../error/${idStatus}`);
      }
      let percentageSort = (a, b) => {
        if((Math.round((b.wins/(b.wins + b.losses))*10000)/100) === (Math.round((a.wins/(a.wins + a.losses))*10000)/100)){
          return (b.wins + b.losses) - (a.wins + a.losses);
        }
        return (Math.round((b.wins/(b.wins + b.losses))*10000)/100) - (Math.round((a.wins/(a.wins + a.losses))*10000)/100);
      };
      idResult[id][0].entries.sort(percentageSort);
      let hotFilter = (player) => {
        return player.isHotStreak;
      };
      let winFilter = (player) => {
        let total = player.wins + player.losses;
        let ratio = player.wins/total;
        return (ratio > .55) && (total > 50);
      };
      let hotResult = idResult[id][0].entries.filter(hotFilter);
      let winResult = idResult[id][0].entries.filter(winFilter);
      res.cookie('id', id, { maxAge: 2592000, httpOnly: true });
      res.cookie('displayName', displayName, { maxAge: 2592000, httpOnly: true });

      // fill out variables, given previous searches with cookies, making sure
      // that it is the same as the person they are searching for
      // this allows us to skip a large part of the process down below,
      // letting us know their ID and that the account exists and is ranked.
      // So, we make less requests and speed up the process.
      url = `https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/${id}?rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5&seasons=SEASON2016&api_key=${Token}`;
      // TODO: change this url every time there is a new season, so that results
      // will be current with year.
      // make a request to get a list of all the match IDs that the user has
      // played in ranked this year.

      let getter = (err, response, data) => {
        if(response.statusCode > 310){
          console.error(response.statusCode);
          request(response.request.uri.href, 5000);
        }
        let matchList = JSON.parse(data);
        let waitTime = moment.duration(((matchList.matches.length/3000)*10500) + 10000).humanize();
        res.cookie('waitTime', (((matchList.matches.length/3000)*10500) + 10000), { maxAge: 2592000, httpOnly: false });
        return res.render("summoner", { winResult: winResult, hotResult: hotResult, name: req.params.summoner, waitTime: waitTime });
      };
      request(url, getter);
    };
  };
}

export default SummonerController;
