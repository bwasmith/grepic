import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import helpers from '../utils/helpers';
import InitialsGrid from './InitialsGrid';

class ContributorGrid extends React.Component {

  constructor(){
    super();
    this. _newContributorRow = this. _newContributorRow.bind(this);
    this. _sortContributorsByName = this. _sortContributorsByName.bind(this);
    this. _sortContributorsByPoints = this. _sortContributorsByPoints.bind(this);
    this. _sort = this. _sort.bind(this);
    this.state = { numberColumns: 4, view: 'initials', sort: 'points' };
  }

  render() {
    if (!this.props.showContributors){
      return (<div/>);
    }

    var contributors = this.props.epicContributors;
    var contributorList = [];

    var styles = {
      grid: {
        paddingTop: '30px'
      },
      row:{
        padding: '10px 0px 10px 0px'
      },
      button: {

      }
    };

    for(var contributor in contributors) {
      contributorList.push({ownerId: contributor, ownerData: contributors[contributor]} );
    };

    contributorList = this._sort(contributorList);

    var contributorRows = [];
    var numContributors = contributorList.length;

    if (this.state.view === 'initials') {
      return (
        <InitialsGrid
          contributorList={contributorList}
          colorFn={this.props.colorFn}
          colorKey={this.props.colorKey} />
      );

    } else if (this.state.view === 'contribution') {
      for (var i = 0; i < numContributors ; i++) {
        contributorRows.push(this._newContributorRow(i, contributorList[i], styles));
      }
    }

    return (
      <Grid style={styles.grid}>
        <ContributionHeader />
        {contributorRows}
      </Grid>
    );
  }

  _sort(contributorList){
    switch (this.state.sort) {
      case 'name':
        return this._sortContributorsByName(contributorList);
      case 'points':
        return this._sortContributorsByPoints(contributorList);
      default:
        return contributorList;
    }
  }

  _sortContributorsByName(contributorList){
    return contributorList.sort(function(a, b) {
      var aName = a.ownerData.name;
      var bName = b.ownerData.name;
      return aName.toLowerCase() > bName.toLowerCase();
    });
    // return contributorList.sort(function(a, b){

    // })
  }

  _sortContributorsByPoints(contributorList){
    return contributorList.sort(function(a,b) {
      var aPoints = a.ownerData.totalPoints;
      var bPoints = b.ownerData.totalPoints;
      return aPoints - bPoints;
    })
  }

  _newContributorRow(i, contributor, styles){
    return (
      <div style={styles.row}>
        <Row>
          <Col md={1}>
            <Button bStyle='primary' disabled={true} style={styles.button}>
              {contributor.ownerData.initials}
            </Button>
          </Col>
          <Col md={1}> {contributor.ownerData.totalPoints} </Col>
          <Col md={1}> {contributor.ownerData.totalStories} </Col>
        </Row>
      </div>
    );
  }
}

class ContributionHeader extends React.Component {
  render() {
    var styles = {
      row: {
        padding: '10px 0px 20px 0px'
      },
      col: {
        fontWeight: 'bold'
      }
    }

    return (
      <Row style={styles.row}>
        <Col style={styles.col} md={1}>Initials</Col>
        <Col style={styles.col} md={1}>Total Points</Col>
        <Col style={styles.col} md={1}>Total Story Count</Col>
      </Row>
    )
  }
}

export default ContributorGrid;
