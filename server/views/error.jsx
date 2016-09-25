import React from "react";

import ErrLayout from "./errLayout.jsx";

class Error extends React.Component {
  constructor(props){
  super(props);
  }

  render(){
    return (
      <ErrLayout model = {this.props} >
        <h1>
          {this.props.message}
        </h1>
        <h2>
          {this.props.error.status}
        </h2>
        <pre>
          <strong>{this.props.error.stack}</strong>
        </pre>
      </ErrLayout>
    );
  }
}

export default Error;
