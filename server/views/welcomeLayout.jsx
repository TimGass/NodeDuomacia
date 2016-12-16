import React from "react";

class WelcomeLayout extends React.Component {
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
            <img src='/images/loading.gif' alt='Loading icon. Please wait!' />
          </body>
        </html>
      )
    };
  }

  componentWillMount(){
    this.setState({
      jsx: (
        <html>
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>DUOmacia</title>
            <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8"/>
            <link rel="stylesheet" href="/stylesheets/welcome.css" media="screen" title="no title" charset="utf-8"/>
          </head>
          <body>
            <div className="container">
                <div className="hero">
                  <img className="Logo" src="/images/Duomacia2.svg" alt="Duomacia's official logo. Says the words DUOmacia with very fancy text!" />
                  <img className="GarenImg" src="/images/GoodEnough.svg" alt="Garen, the might of demacia! Large man, with giant armor and a massive sword! DEMACIA!!!" />
                </div>
                <label for="search">Please input the account you wish to search:</label>
                <h1>Use Valkrin for testing</h1>
                <form className="search" action="/search" method="post">
                  {this.props.children}
                  <button type="submit" name="submit">Forge onwards!</button>
                </form>
            </div>
            <footer>
              <p>DUOmacia is a free website meant to be used by players. No distribution or use of images, code, or other material is approved, except by respective owners.</p>
            </footer>
            <script type="text/javascript" src="/javascripts/welcome.js">
            </script>
          </body>
        </html>
      )
    });
  }

  render(){
    return this.state.jsx;
  }
}

export default WelcomeLayout;
