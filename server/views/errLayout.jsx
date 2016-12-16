import React from "react";

class ErrLayout extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.model.title}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" media="screen" title="no title" charSet="utf-8" />
          <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>
          {this.props.children}
          <script src="/socket.io/socket.io.js"></script>
          <script>
            var socket = io();
          </script>
        </body>
      </html>
    );
  }
}

export default ErrLayout;
