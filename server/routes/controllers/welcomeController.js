function WelcomeController(req, res) {
  if(req.cookies.displayName){
    let displayName = req.cookies.displayName;
    res.render("welcome", { displayName: displayName });
  }
  else{
    res.render("welcome");
  }
}

export default WelcomeController;
