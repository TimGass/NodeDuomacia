import React from 'react';

class Summoner extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jsx: (
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8" />
            <link rel="stylesheet" href="/stylesheets/loading.css" media="screen" title="no title" charset="utf-8" />
            <title>Loading</title>
          </head>
          <body>
            <h1 className="errorText">An error occurred in displaying this page! Please refresh!</h1>
          </body>
        </html>
      )
    };
  }

  componentWillMount(){
    let winners = this.props.winResult.map(function(player){
      return (
        <div className="innerWrapper">
          <h4> {player.playerOrTeamName} </h4>
          <h5>
            percentage: { Math.round((player.wins/(player.wins + player.losses))*10000)/100}%
          </h5>
          <h5>
            Games: { player.wins + player.losses }
          </h5>
        </div>
      );
    });

    let streakers = this.props.hotResult.map(function(player){
      return (
        <div className="innerWrapper">
          <h4> { player.playerOrTeamName } </h4>
          <h5>
            percentage: { Math.round((player.wins/(player.wins + player.losses))*10000)/100 }%
          </h5>
          <h5>
            Games: { player.wins + player.losses }
          </h5>
        </div>
      );
    });

    this.setState({
      jsx: (
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{this.props.name} on DUOmacia!</title>
            <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8" />
            <link rel="stylesheet" href="/stylesheets/summoner.css" media="screen" title="no title" charset="utf-8" />
          </head>
          <body>
            <div className="headingBox">
              <a href="../../">Home</a>
              <h1>Hello, {this.props.name}!</h1>
              <h2>Here are your results:</h2>
            </div>
            <div className="leftBox">
              <h3>Winning Players!</h3>
              { winners }
            </div>
            <img className="Logo" src="/images/Duomacia2.svg" alt="Duomacia's official logo. Says the words DUOmacia with very fancy text!" />
            <div className="rightBox">
              <h3>Hot Streak Players!</h3>
              { streakers }
            </div>
            <a className="" href={`/summoner/${this.props.name}/loading`}>
              <div className="suggestedBox">
                <h3>Find Suggested Players!</h3>
                <p>
                  Suggested players lists the winrates you have had with all players you have played with.
                  It is the most recommended feature of this site. However, due to Riot API's rate limiting
                  it may take some time.
                </p>
                <h3>Estimated time for completion is: {this.props.waitTime} </h3>
              </div>
            </a>
            <script type="text/javascript" src="/javascripts/summoner.js">
            </script>
          </body>
        </html>
      )
    });
  }

  render () {
    return this.state.jsx;
  }
}

export default Summoner;
