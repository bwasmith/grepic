import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import helpers from '../utils/helpers';

class Contributions extends React.Component {

  constructor(){
    super();
    this. _newInitialsRow = this. _newInitialsRow.bind(this);
    this. _newContributorRow = this. _newContributorRow.bind(this);
    this. _sortContributorsByName = this. _sortContributorsByName.bind(this);
    this. _sortContributorsByPoints = this. _sortContributorsByPoints.bind(this);
    this. _sort = this. _sort.bind(this);
    this.state = { numberColumns: 4, view: 'initials', sort: 'points' };
  }

  render() {
    var contributors = this.props.contributors;
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

    for(var key in contributors) {
      contributorList.push({key: key, value: contributors[key]} );
    };

    contributorList = this._sort(contributorList);

    var contributorRows = [];
    var numContributors = contributorList.length;

    if (this.state.view === 'initials') {
      for (var i = 0; i < numContributors ; i+=this.state.numberColumns) {
        contributorRows.push(this._newInitialsRow(i, contributorList, styles));
      };
    } else if (this.state.view === 'contribution') {
      for (var i = 0; i < numContributors ; i++) {
        contributorRows.push(this._newContributorRow(i, contributorList[i], styles));
      }
    }

    return (
      <Grid style={styles.grid}>
        {this.state.view === 'contribution' ? <ContributionHeader /> : null }
        { contributorRows }
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
    console.log('sorted by name')
    return contributorList.sort(function(a, b) {
      var aName = a.value.name;
      var bName = b.value.name;
      return aName.toLowerCase() > bName.toLowerCase();
    });
    // return contributorList.sort(function(a, b){

    // })
  }

  _sortContributorsByPoints(contributorList){
    console.log('sorted by points')
    return contributorList.sort(function(a,b) {
      var aPoints = a.value.total_points;
      var bPoints = b.value.total_points;
      return aPoints - bPoints;
    })
  }

  _newContributorRow(i, contributor, styles){
    return (
      <div style={styles.row}>
        <Row>
          <Col md={2}>
            <Button bStyle='primary' disabled={true} style={styles.button}>
              {contributor.value.initials}
            </Button>
          </Col>
          <Col md={2}> {contributor.value.total_points} </Col>
          <Col md={2}> {contributor.value.total_stories} </Col>
        </Row>
      </div>
    );
  }

  _newInitialsRow(i, contributorList, styles) {
    var columns = []
    for (var index = i; index < i + this.state.numberColumns; index++){
      if (index >= contributorList.length){
        break;
      }
      console.log('hello were here before');

      var contributorInitials = contributorList[index].value.initials;
      var contributorPoints = contributorList[index].value.total_points;
      var contributorColor = helpers.setColor(this.props.colorFn, contributorPoints, this.props.colorKey);
      console.log(this.props.colorFn)
      console.log(contributorPoints)
      console.log(this.props.colorKey)
      console.log('hello were here');

      var buttonStyle = {
        backgroundColor: `${contributorColor}`,
        opacity: 1,

      };
      columns.push(
        <Col key={contributorInitials} md={2}>
          <Button style={buttonStyle} disabled={true} >
            {contributorInitials}
          </Button>
        </Col>
      );
    }

    return (
      <div style={styles.row}>
        <Row key={this.state.key}>
          {columns}
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
        <Col style={styles.col} md={2}>Initials</Col>
        <Col style={styles.col} md={2}>Total Points</Col>
        <Col style={styles.col} md={2}>Total Story Count</Col>
      </Row>
    )
  }
}

export default Contributions;
