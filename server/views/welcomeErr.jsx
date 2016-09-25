import React, { PropTypes } from 'react';

import WelcomeLayout from "./welcomeLayout.jsx";

class WelcomeErr extends React.Component {
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
    if(Number(this.props.status) === 404){
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="Account not found in NA"/>
          </WelcomeLayout>
        )
      });
    }
    else if(this.props.status === "empty") {
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="No account given!"/>
          </WelcomeLayout>
        )
      });
    }
    else if(this.props.status === "unranked") {
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="Account is unranked"/>
          </WelcomeLayout>
        )
      });
    }
    else if(decodeURIComponent(this.props.status) === "No internet connection"){
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input type="text" name="search" placeholder="No internet connection"/>
          </WelcomeLayout>
        )
      });
    }
    else {
      this.setState({
        jsx: (
          <WelcomeLayout>
            <input class="failed" type="text" name="search" placeholder={"Search failed! status:" + this.props.status}/>
          </WelcomeLayout>
        )
      });
    }
  }

  render () {
    return this.state.jsx;
  }
}

export default WelcomeErr;
