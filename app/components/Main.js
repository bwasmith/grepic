import React from 'react';
import { RouteHandler } from 'react-router';
import TokenForm from './TokenForm';
import ProjectDropdown from './ProjectDropdown';
import helpers from '../utils/helpers';

class Main extends React.Component{

  constructor() {
    super();
    this. _handleTokenSubmit = this. _handleTokenSubmit.bind(this);
    this. _handleProjectSelect = this. _handleProjectSelect.bind(this);
    this.state = {token: null};
  }

  render(){
    var accessToken = this.props.query.access_token;
    var refreshToken = this.props.query.refresh_token;
    //error works?
    var error = this.props.query.error;

    if(error){ alert('There was an error during the authentication'); }

		return(
			<div className="main-container">
				<div className="container">

          <TokenForm onTokenSubmit={this._handleTokenSubmit} />

          {
            this.state.token
              ? <ProjectDropdown projectNames={this.state.projectNames}/>
              : null
          }

					<RouteHandler {...this.props} />
				</div>
			</div>
		);
	}

  _handleTokenSubmit(token){
    helpers.getProjectData(token)
      .then(function(response){
        var projectNames = response.data.map(function(project) {
          return project.name;
        })
        this.setState({
          token: token,
          projectNames: projectNames
        });
      }.bind(this));
  }

  _handleProjectSelect(e){
    console.log("PROJECT SELECT EVENT:", e)
    console.log('selectvalue', this.refs.project.value)
    console.log('selectvalue DOMNODE', React.findDOMNode(this.refs.project).value)
  }
};

  Main.contextTypes = {
    router: React.PropTypes.func
  };

export default Main;
