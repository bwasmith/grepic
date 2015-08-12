import React from 'react';
import { RouteHandler } from 'react-router';
import TokenForm from './TokenForm';
import ProjectDropdown from './ProjectDropdown';
import EpicDropdown from './EpicDropdown';
import ContributorGrid from './ContributorGrid';
import helpers from '../utils/helpers';
import ColorLegend from './ColorLegend';
import ContributorsDropdown from './ContributorsDropdown';
import { Grid, Row, Col, Button } from 'react-bootstrap';


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
      colorFn: helpers.generateColorFn(colorKey),
      projectsRaw: null,
      epicsRaw: null,
      contributorsRaw: null,
      contributions: null,
      currentEpic: null,
      currentProject: null
    };
  }

  render(){
    //error works?
    var error = this.props.query.error;

    var styles = {
      leftContainer: {
        
      },
      h1: {
        fontSize: '30px',
        fontWeight: 'bold',
        display: 'block'
      },
      h3: {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'block'

      },
      header: {
        float: 'center'
      },
      contentRow: {
        paddingTop: '20px'
      }
    }

    var projectsDisabled = this.state.projectsRaw === null;
    var epicsDisabled = this.state.epicsRaw === null;
    var contributorsDisabled = this.state.contributorsRaw === null;

    if(error){ alert('There was an error during the authentication'); }
		return(
      <div className="main-container">
        <Grid>
          <Row>
            <Col md={3}>
              <div style={styles.header}>  
                <span style={styles.h1}> Grepic </span>
                <span style={styles.h3}> B & D </span>
              </div>
            </Col>
          </Row>  
          <Row style={styles.contentRow}>
            <Col  md={3}>
              <TokenForm onTokenSubmit={this._handleTokenSubmit} />

              <ProjectDropdown
                    key={this.state.token}
                    name={'ProjectsDropdown'}
                    projectsRaw={this.state.projectsRaw}
                    onProjectSelect={this._handleProjectSelect}
                    disabled={projectsDisabled} />

              <EpicDropdown
                key={this.state.currentProject+1}
                name={'EpicsDropdown'}
                epicsRaw={this.state.epicsRaw}
                onEpicSelect={this._handleEpicSelect} 
                disabled={epicsDisabled}/> 

              <ContributorsDropdown
                key={this.state.currentProject+2}
                name={'ContributorsDropdown'}
                contributorsRaw={this.state.contributorsRaw} 
                disabled={contributorsDisabled} />
            </Col>

            <Col md={6}>
              {
                this.state.epicContributors ?
                  <ContributorGrid
                    key={this.state.currentEpic+3}
                    epicContributors={this.state.epicContributors}
                    colorFn={this.state.colorFn}
                    colorKey={this.state.colorKey} /> :

                  null
              }
            </Col>

            <Col  md={3}>
              <ColorLegend
                  colorKey={this.state.colorKey}
                  colorFn={this.state.colorFn}
                  onLegendChange={this._handleLegendChange}/>
            </Col>
          </Row>
        </Grid>


        <RouteHandler {...this.props} />
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

    helpers.getContributors(projectId, this.state.token)
      .then(function(response) {
        var contributorsRaw = response.data;
        this.setState({
          contributorsRaw: contributorsRaw
        });
      }.bind(this));
  }

  _handleEpicSelect(e, epicId) {
    var currentEpic = this._findEpicName(this.state.epicsRaw, epicId)
    helpers.getEpicStories(this.state.currentProject, currentEpic.name, this.state.token)
      .then(function(stories) {
        var epicData = this._processEpicData(stories.data);

        // console.log(epicData.epicContributors)

        this.setState({
          totalPoints: epicData.totalPoints,
          totalStories: epicData.totalStories,
          epicContributors: epicData.epicContributors,
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
      epicContributors:{
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
        epicContributors: epicContributors,
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
