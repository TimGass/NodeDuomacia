import React, { PropTypes } from 'react';
import moment from "moment";

class Loading extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: "0 minutes remaining"
    }
  }
  componentWillMount(){
    this.setState({
      time: moment.duration(this.props.waitTime).humanize()
    });
  }
  render () {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/stylesheets/normalize.css" media="screen" title="no title" charset="utf-8" />
          <link rel="stylesheet" href="/stylesheets/loading.css" media="screen" title="no title" charset="utf-8" />
          <title>Loading</title>
        </head>
        <body>
          <h3>This may take a few minutes</h3>
          <div className="imageBorder">
            <img src='/images/loading.gif' alt='Loading icon. Please wait!' />
          </div>
          <h3 className="waitTime"> Estimated time remaining: { this.state.time } </h3>
          <form method="post" action="suggestions" className="form">
          </form>
          <script type="text/javascript" src="/socket.io/socket.io.js"></script>
          <script type="text/javascript" src="/javascripts/loading.js"></script>
        </body>
      </html>
    );
  }
}

export default Loading;
