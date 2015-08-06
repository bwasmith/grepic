import React from 'react';
import { RouteHandler } from 'react-router';
import TokenForm from './TokenForm';
import Dropdown from './Dropdown';
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
    var epics = this.state.epics;

    if(error){ alert('There was an error during the authentication'); }

		return(
			<div className="main-container">
				<div className="container">

          <TokenForm onTokenSubmit={this._handleTokenSubmit} />

          {
            this.state.token ?
              <Dropdown
                name={'ProjectsDropdown'}
                dropdownItems={this.state.projects}
                onDropdownSubmit={this._handleProjectSelect} /> :
              null
          }

          {
            this.state.epics ?
              <Dropdown
                name={'EpicsDropdown'}
                dropdownItems={epics}
                onDropdownSubmit={function(){return null;}} /> :
              null
          }

					<RouteHandler {...this.props} />
				</div>
			</div>
		);
	}

  _handleTokenSubmit(token) {
    helpers.getProjectData(token)
      .then(function(response) {
        var projects = response.data;
        this.setState({
          token: token,
          projects: projects,
          epics: null
        });
      }.bind(this));


  }

  _handleProjectSelect(e, projectId) {
    helpers.getEpics(projectId, this.state.token)
      .then(function(response) {
        var epics = response.data;
        this.setState({
          currentProject: projectId,
          epics: epics
        });
      }.bind(this));

  }
};

  Main.contextTypes = {
    router: React.PropTypes.func
  };

export default Main;
