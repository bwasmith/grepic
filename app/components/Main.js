import React from 'react';
import { RouteHandler } from 'react-router';
import TokenForm from './TokenForm';
import ProjectDropdown from './ProjectDropdown';
import EpicDropdown from './EpicDropdown';
import ContributorGrid from './ContributorGrid';
import helpers from '../utils/helpers';
import ColorLegend from './ColorLegend';
import ContributorsDropdown from './ContributorsDropdown';

class Main extends React.Component{

  constructor() {
    super();
    this. _handleTokenSubmit = this. _handleTokenSubmit.bind(this);
    this. _handleProjectSelect = this. _handleProjectSelect.bind(this);
    this. _handleEpicSelect = this. _handleEpicSelect.bind(this);
    this. _processEpicData = this. _processEpicData.bind(this);
    this. _handleLegendChange = this. _handleLegendChange.bind(this);


    var colorKey = {
      wandering: 0,
      comfy: 4,
      soloReady: 10,
      architect: 18,
      anchor: 28
    };

    this.state = {
      token: null,
      colorKey: colorKey ,
      colorFn: helpers.generateColorFn(colorKey)
    };
  }

  render(){
    //error works?
    var error = this.props.query.error;

    if(error){ alert('There was an error during the authentication'); }
		return(
			<div className="main-container">
				<div className="container">

          <TokenForm onTokenSubmit={this._handleTokenSubmit} />
          <ColorLegend
            colorKey={this.state.colorKey}
            colorFn={this.state.colorFn}
            onLegendChange={this._handleLegendChange}/>

          {
            this.state.token ?
              <ProjectDropdown
                name={'ProjectsDropdown'}
                projectsRaw={this.state.projectsRaw}
                onProjectSelect={this._handleProjectSelect} /> :
              null
          }

          {
            this.state.epicsRaw ?
                <EpicDropdown
                  name={'EpicsDropdown'}
                  epicsRaw={this.state.epicsRaw}
                  onEpicSelect={this._handleEpicSelect} /> :

              null
          }

          {

          }

          {
            this.state.contributors ?
              <ContributorGrid
                key={this.state.currentEpic}
                contributors={this.state.contributors}
                colorFn={this.state.colorFn}
                colorKey={this.state.colorKey} /> :

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

        var projectsRaw = response.data;
        this.setState({
          token: token,
          projectsRaw: projectsRaw,
          epicsRaw: null,
          contributions: null,
          currentEpic: null,
          currentProject: null
        });
      }.bind(this));


  }

  _handleProjectSelect(e, projectId) {
    helpers.getEpics(projectId, this.state.token)
      .then(function(response) {
        var epicsRaw = response.data;
        this.setState({
          currentProject: projectId,
          epicsRaw: epicsRaw,
          contributions: null,
          currentEpic: null
        });
      }.bind(this));
  }

  _handleEpicSelect(e, epicId) {
    var currentEpic = this._findEpicName(this.state.epicsRaw, epicId)
    helpers.getEpicStories(this.state.currentProject, currentEpic.name, this.state.token)
      .then(function(stories) {
        var epicData = this._processEpicData(stories.data);

        this.setState({
          totalPoints: epicData.totalPoints,
          totalStories: epicData.totalStories,
          contributors: epicData.contributors,
          currentEpic: epicId
        });

      }.bind(this));
  }

  _findEpicName(arr, id){
    var epic;
    for (var i = 0; i < arr.length; i++) {
      epic = arr[i];
      if (epic['id'] == id) {
        return epic;
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

    Returned: {
      contributors:{
        ownerid: {
          name:
          initials:
          totalStories
          totalPoints
        }
        ...(for n owners)
      }
      totalPoints:
      totalStories:
    }

  */
  _processEpicData(stories){
    var epicContributors = {};
    var epicTotalPoints = 0;
    var epicTotalStories = 0;

    var story, storyOwners, owner, storyType, storyPoints;
    for (var i = 0; i < stories.length; i++){
      story = stories[i];

      if (story.current_state !== 'accepted') {
        continue;
      }

      //from JSON response
      storyOwners = story.owners;
      storyType = story.story_type;
      storyPoints = story.estimate || 1;

      //our return object
      epicTotalPoints += storyPoints;
      epicTotalStories += 1;
      for (var j = 0; j < storyOwners.length; j++){
        owner = storyOwners[j];
        if (epicContributors[owner.id]) {
          epicContributors[owner.id].totalPoints += storyPoints;
          epicContributors[owner.id].totalStories += 1;
        } else {
          var newContributor = {};
          newContributor.totalStories = 1;
          newContributor.totalPoints = storyPoints;
          newContributor.initials = owner.initials;
          newContributor.name = owner.name;

          epicContributors[owner.id] = newContributor;
        }
      }
    }

    //add coolors to dictionary items
      //down here becasue you need total point count

    return (
      {
        totalPoints: epicTotalPoints,
        totalStories: epicTotalStories,
        contributors: epicContributors,
      }
    );

  }

  _handleLegendChange(colorKey) {
    this.setState({
      colorKey: colorKey,
      colorFn: helpers.generateColorFn(colorKey)
    })
  }
};

  Main.contextTypes = {
    router: React.PropTypes.func
  };

export default Main;
