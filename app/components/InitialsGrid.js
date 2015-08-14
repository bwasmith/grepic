import React from 'react';
import helpers from '../utils/helpers';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class InitialsGrid extends React.Component{
  render(){
    var contributorList = this.props.contributorList
    var initialsNodes = this.props.contributorList.map(function(contributor) {
      var initials = contributor.ownerData.initials;
      var points = contributor.ownerData.totalPoints;
      var contributorColor = helpers.setColor(this.props.colorFn, points, this.props.colorKey);

      return (
        <ContributorInitials
          key={initials}
          initials={initials}
          contributorColor={contributorColor}/>
      )
    }, this);
    return (
      <div>
        <Row>
          {initialsNodes}
        </Row>
      </div>
      )
  }
}

class ContributorInitials extends React.Component{
  render() {

    var styles = {
      button: {
          backgroundColor: `${this.props.contributorColor}`,
          opacity: 1,
          marginLeft: '30%',
          padding: '10px'
        },
        column: {
          paddingBottom: '20px'
        }
    }
    return(
        <Col key={this.props.initials} style={styles.column} md={3}>
          <Button style={styles.button}>
            {this.props.initials}
          </Button>
        </Col>
    )
  }
}
export default InitialsGrid;
