import React from 'react';
import EpicNode from './EpicNode';
import { Row } from 'react-bootstrap';

class EpicsGrid extends React.Component {
  constructor() {
    super();

    this. _processStoriesData = this. _processStoriesData.bind(this);
  }

  componentWillMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._init(nextProps);
  }

  render() {
    var { sortedEpicKeys, processedEpicData } = this.state;

    var count = 0;
    var epicObject;

    var epicNodes =
      sortedEpicKeys.map(function(labelName){
        epicObject = processedEpicData[labelName];

        return(
          <EpicNode
            key={count++}
            name={labelName}
            points={epicObject.donePoints}
            stories={epicObject.doneStories}
            colorKey={this.props.colorKey}
            colorFn={this.props.colorFn} />
        );
    }, this);

    return(
      <div className="epicsGrid">
        <Row>
          {epicNodes}
        </Row>
      </div>
    );
  }

  _processStoriesData(stories) {
    var epicHash = {};

    stories.map(function(story){
      //counting 0 point features as 1 point here, can change that.
      var estimate = story.estimate || 1;

      if(estimate < 0) {
        alert('apparently estimates can be negative, fix _processStoriesData in EpicsGrid');
        console.log(story);
      };

      // type = story.story_type;

      for(var label in story.labels) {
        var obj = story.labels[label];

        var labelName = obj.name;

        if(!epicHash[labelName]) {
          epicHash[labelName] = {
            doneStories: 0,
            donePoints: 0
          };
        }
        epicHash[labelName].doneStories++;
        epicHash[labelName].donePoints += estimate;
      };
    });

    var sortedEpicKeys = this._sortEpicKeysByPoints(epicHash);
    return {
      epicHash: epicHash,
      sortedEpicKeys: sortedEpicKeys
    };
  }

  _sortEpicKeysByPoints(epicHash) {
    var sortedEpicKeys =
      Object.keys(epicHash)
        .sort(function(a, b) {
          return epicHash[b].donePoints - epicHash[a].donePoints;
        });
    return sortedEpicKeys;
  }

  _init(props) {
    var { stories, total_hits, total_hits_with_done, total_points_completed } = props.contributorStoriesRaw;
    var { epicHash, sortedEpicKeys } = this._processStoriesData(stories);
    this.setState({
      doneStories: (total_hits_with_done - total_hits),
      donePoints: total_points_completed,
      processedEpicData: epicHash,
      sortedEpicKeys: sortedEpicKeys
    })
  }
}

export default EpicsGrid;
