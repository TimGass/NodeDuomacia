function SearchController(req, res){
  if(req.body.search){
    res.redirect(`../summoner/${req.body.search}`);
  }
  else {
    res.redirect("../error/empty");
  }
}

export default SearchController;
