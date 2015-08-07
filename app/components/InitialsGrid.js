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

      var buttonStyle = {
        backgroundColor: `${contributorColor}`,
        opacity: 1,
      };

      return (
        <ContributorInitials
          key={initials}
          initials={initials}
          buttonStyle={buttonStyle} />
      )
    }, this);

    return (
      <Grid>
        <div>
          <Row>
            {initialsNodes}
          </Row>
        </div>
      </Grid>
      )
  }
}

class ContributorInitials extends React.Component{
  render() {
    return(
        <Col key={this.props.initials} md={4}>
          <Button style={this.props.buttonStyle} disabled={true} >
            {this.props.initials}
          </Button>
        </Col>
    )
  }
}
export default InitialsGrid;
