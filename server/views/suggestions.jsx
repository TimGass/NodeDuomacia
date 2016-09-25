import React from "react";

class Suggestions extends React.Component {
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
    let total = this.props.totalMapped.
      map((player) => {
        return (
          <div className="innerWrapper">
            <h4> { player.name } </h4>
            <h5>
              percentage: { player.percentage }%
            </h5>
            <h5>
              Games: { player.total }
            </h5>
          </div>
        );
      });

    if(this.props.preffered.length >= 5){
      let preffered = this.props.preffered.
        map((player) => {
          return (
            <div className="innerWrapper">
              <h4> { player.name } </h4>
              <h5>
                percentage: { player.percentage }%
              </h5>
              <h5>
                Games: { player.total }
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
              <title>{ this.props.displayName } on DUOmacia!</title>
              <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8" />
              <link rel="stylesheet" href="/stylesheets/suggestions.css" media="screen" title="no title" charset="utf-8" />
            </head>
            <body>
              <div className="headingBox">
                <a href="../../">Home</a>
                <a href="./">Back</a>
                <h1>Hello, { this.props.displayName }!</h1>
                <h2>Here are your results:</h2>
              </div>
              <div className="leftBox">
                <h3>Suggested Players!</h3>
                { preffered }
              </div>
              <img className="Logo" src="/images/Duomacia2.svg" alt="Duomacia's official logo. Says the words DUOmacia with very fancy text!" />
              <div className="rightBox">
                <h3>All players!</h3>
                { total }
              </div>
              <script type="text/javascript" src="/javascripts/summoner.js">
              </script>
            </body>
          </html>
        )
      });
    }
    else{
      let lessPreffered = this.props.lessPreffered.
      map((player) => {
        return (
          <div className="innerWrapper">
            <h4> { player.name } </h4>
            <h5>
              percentage: { player.percentage }%
            </h5>
            <h5>
              Games: { player.total }
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
              <title>{ this.props.displayName } on DUOmacia!</title>
              <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8" />
              <link rel="stylesheet" href="/stylesheets/suggestions.css" media="screen" title="no title" charset="utf-8" />
            </head>
            <body>
              <div className="headingBox">
                <a href="../../">Home</a>
                <a href={`../${this.props.displayName}`}>Back</a>
                <h1>Hello, { this.props.displayName }!</h1>
                <h2>Here are your results:</h2>
              </div>
              <div className="leftBox">
                <h3>Suggested Players!</h3>
                { lessPreffered }
              </div>
              <img className="Logo" src="/images/Duomacia2.svg" alt="Duomacia's official logo. Says the words DUOmacia with very fancy text!" />
              <div className="rightBox">
                <h3>All players!</h3>
                { total }
              </div>
              <script type="text/javascript" src="/javascripts/summoner.js">
              </script>
            </body>
          </html>
        )
      });
    }
  }

  render () {
    return this.state.jsx;
  }
}

export default Suggestions;
