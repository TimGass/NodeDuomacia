import React from 'react';

import WelcomeLayout from "./welcomeLayout.jsx";

class Welcome extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jsx: (
        <WelcomeLayout>
          <h3 className="errorText">An error occurred in displaying this page! Please refresh!</h3>
        </WelcomeLayout>
      )
    };
  }

  componentWillMount(){
    if(this.props.displayName){
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="NA only" value={this.props.displayName} />
          </WelcomeLayout>
        )
      });
    }
    else {
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="NA only" />
          </WelcomeLayout>
        )
      });
    }
  }

  render () {
    return this.state.jsx;
  }
}

export default Welcome;
