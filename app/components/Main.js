import React from 'react';
import { RouteHandler } from 'react-router';

class Main extends React.Component{
	render(){

    var accessToken = this.props.query.access_token;
    var refreshToken = this.props.query.refresh_token;
    //error works?
    var error = this.props.query.error;

    if(error){ alert('There was an error during the authentication'); }

		return(
			<div className="main-container">
				<div className="container">
          <p>HELLO WORLD! -from B and D</p>
					<RouteHandler {...this.props} />
				</div>
			</div>
		)
	}
};

Main.contextTypes = {
  router: React.PropTypes.func
};

export default Main;
