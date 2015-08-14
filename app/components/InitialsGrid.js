import React from 'react';
import helpers from '../utils/helpers';
import { Grid, Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';

class InitialsGrid extends React.Component{
  render(){
    var contributorList = this.props.contributorList
    var initialsNodes = this.props.contributorList.map(function(contributor) {
      console.log('contributor', contributor)

      var contributorColor = helpers.setColor(this.props.colorFn, contributor.ownerData.totalPoints, this.props.colorKey);

      return (
        <ContributorInitials
          key={contributor.ownerData.initials}
          contributor={contributor}
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
    var contributor = this.props.contributor;

    var initials = contributor.ownerData.initials;
    var totalPoints = contributor.ownerData.totalPoints;
    var totalStories = contributor.ownerData.totalStories;
    var featureCount = contributor.ownerData.featureCount;
    var bugCount = contributor.ownerData.bugCount;
    var choreCount = contributor.ownerData.choreCount;

    var name = contributor.ownerData.name;

    var styles = {
      button: {
          backgroundColor: `${this.props.contributorColor}`,
          opacity: 1,
          marginLeft: '40%',
          width: '70px',
          height: '70px',
          fontSize: '20px'
        },
        column: {
          paddingBottom: '30px'
        }

    }
    var storyTypes = ['feature','chore', 'bug'];

    var overlay = <Popover title={name}>
                    {`Total Pseudo Points: ${totalPoints}\n`} <br/>
                    {`Total Stories: ${totalStories}`} <br/>
                    {contributor.ownerData['featureCount'] !== undefined ? `features: ${contributor.ownerData['featureCount']} ` : null}
                    {contributor.ownerData['bugCount'] !== undefined ? `bugs: ${contributor.ownerData['bugCount']} ` : null}
                    {contributor.ownerData['choreCount'] !== undefined ? `chores: ${contributor.ownerData['choreCount']} ` : null}
                    </Popover>


    return(
        <Col key={initials} style={styles.column} md={3}>
          <OverlayTrigger trigger='click' placement='right' overlay={overlay}>
            <Button style={styles.button}>
              {initials}
            </Button>
          </OverlayTrigger>
        </Col>
    )
  }
}


        // {`points: ${this.props.points} `}

// stories=${this.props.stories}


export default InitialsGrid;
