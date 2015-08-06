import React from 'react';
import { RouteHandler } from 'react-router';
import TokenForm from './TokenForm';
import ProjectDropdown from './ProjectDropdown';
import EpicDropdown from './EpicDropdown';
import Contributions from './Contributions';
import helpers from '../utils/helpers';

class Main extends React.Component{

  constructor() {
    super();
    this. _handleTokenSubmit = this. _handleTokenSubmit.bind(this);
    this. _handleProjectSelect = this. _handleProjectSelect.bind(this);
    this. _handleEpicSelect = this. _handleEpicSelect.bind(this);
    this. _findElemInArray = this. _findElemInArray.bind(this);
    this. _processContributorResponse = this. _processContributorResponse.bind(this);
    this.state = {token: null};
  }

  render(){
    //error works?
    var error = this.props.query.error;

    if(error){ alert('There was an error during the authentication'); }

		return(
			<div className="main-container">
				<div className="container">

          <TokenForm onTokenSubmit={this._handleTokenSubmit} />

          {
            this.state.token ?
              <ProjectDropdown
                name={'ProjectsDropdown'}
                projects={this.state.projects}
                onProjectSelect={this._handleProjectSelect} /> :
              null
          }

          {
            this.state.epics ?
              <EpicDropdown
                name={'EpicsDropdown'}
                epics={this.state.epics}
                onEpicSelect={this._handleEpicSelect} /> :
              null
          }

          {
            this.state.contributors ?
              <Contributions key={this.state.currentEpic} contributors={this.state.contributors} /> :
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
          epics: null,
          contributions: null,
          currentEpic: null,
          currentProject: null
        });
      }.bind(this));


  }

  _handleProjectSelect(e, projectId) {
    helpers.getEpics(projectId, this.state.token)
      .then(function(response) {
        var epics = response.data;
        this.setState({
          currentProject: projectId,
          epics: epics,
          contributions: null,
          currentEpic: null

        });
      }.bind(this));
  }

  _handleEpicSelect(e, epicId) {
    var currentEpic = this._findElemInArray(this.state.epics, 'id', epicId)
    helpers.getContributors(this.state.currentProject, currentEpic.name, this.state.token)
      .then(function(response) {
        this._processContributorResponse(response.data, epicId);

      }.bind(this));
  }

  _findElemInArray(arr, attribute, value){
    var item;
    for (var i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item[attribute] == value) {
        return item;
      }
    }
    return -1
  }

  /**
    Incoming: [ 
      {
        estimate: 
        id: *storyid* 
        owners: [owner list]
        story_type   
      }
      ..
    ]

    Returned: [
      {
        name:
        initials:
        total_stories:
        total_points:
      }
      ..
    ]
  */
  _processContributorResponse(data, epicId){
    var contributors = {};
    var epicTotalPoints = 0;
    var epicTotalStories = 0;

    var story, ownerList, owner, story_type, story_points;
    for (var i = 0; i < data.length; i++){
      story = data[i];

      if (story.current_state !== 'accepted') {
        continue;
      }

      ownerList = story.owners;
      story_type = story.story_type;
      story_points = story_type === 'feature' ? story.estimate : 1;
      epicTotalPoints += story_points;
      epicTotalStories += 1;
      for (var j = 0; j < ownerList.length; j++){
        owner = ownerList[j];
        if (contributors[owner.id]) {
          contributors[owner.id].total_points += story_points;
          contributors[owner.id].total_stories += 1;
        } else {
          var newContributor = {};
          newContributor.total_stories = 1;
          newContributor.total_points = story_points;
          newContributor.initials = owner.initials;
          newContributor.name = owner.name;

          contributors[owner.id] = newContributor;
        }
      }
    }

    this.setState({
      totalPoints: epicTotalPoints,
      totalStories: epicTotalStories,
      contributors: contributors,
      currentEpic: epicId
    })
  }
};

  Main.contextTypes = {
    router: React.PropTypes.func
  };

export default Main;
