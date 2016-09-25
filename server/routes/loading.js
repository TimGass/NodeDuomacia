var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/:summoner/loading', function(req, res, next) {
  let status;
  if(req.cookies.id && req.cookies.displayName && (req.cookies.displayName === req.params.summoner)){
    res.render("loading", { waitTime: req.cookies.waitTime });
  }
  else {
    let trueName = decodeURIComponent(req.params.summoner).toLowerCase().replace(/[\s,.\/;'\[\]\\=`<>?:\"{}|_+~!@#$%^&*()-]/gm, "");
    //remove characters not allowed in account names
    if(trueName.length === 0){
      return res.redirect("../../../error/empty");
    }
    // if empty, return error. In this case, empty is used to let the person
    // know they have inputed an invalid account
    let url = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${trueName}?api_key=92883dda-0342-4f3c-b9aa-dcc33dbcd75c`;
    //make request for account id, so more requests can be made using that id.

    request(url, (err, response, data) => {
      //catch errors, this will be in the format of all future requests.
      let result = data;
      status = response.statusCode;

      // define a function to run all the code that depends on the above request
      if(status > 310){
        return res.redirect(`../../../error/${status}`);
      }
      result = JSON.parse(result);
      let displayName = result[trueName].name;
      // use Riot's response to what the account name really is.
      let id = result[trueName].id;
      let idResult;
      // hoisted to keep the scope outside of the request promise level and on the
      // same level as code that is run aftwerwards, probably not necessary but
      // does not hurt to be extra safe.
      url = `https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/${id}?api_key=92883dda-0342-4f3c-b9aa-dcc33dbcd75c`;
      // makes request to find the league of the account to ensure they are
      // ranked this season.

      let dataHandler = () => {
        if(status === 404){
          status = "unranked";
          return res.redirect(`../../../${status}`);
          // A 404 after getting a valid idea tells us that the account exists,
          // but is unranked this season.
        }
        else if(status > 310){
          return res.redirect(`../../../${status}`);
        }
        res.cookie("id", id, { maxAge: 259200, httpOnly: true });
        res.cookie("displayName", displayName, { maxAge: 259200, httpOnly: true });
        // set cookies to speed up process and get rid of two requests, if they
        // return and search for the same person.

        return res.render("loading", { waitTime: req.cookies.waitTime });
      };

      request(url, (err, response, data) => {
        let result = data;
        status = response.statusCode;
        if(status === 404){
          status = "unranked";
          return res.redirect(`../../../${status}`);
          // A 404 after getting a valid idea tells us that the account exists,
          // but is unranked this season.
        }
        else if(status > 310){
          return res.redirect(`../../../${status}`);
        }
        idResult = JSON.parse(data);
        status = response.statusCode;
        dataHandler();
      });
      // run a function containing all code that depends on this request in the
      // promise function of request, to avoid Async issues
    });
  }
});

module.exports = router;
