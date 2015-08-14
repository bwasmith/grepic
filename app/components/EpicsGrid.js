import React from 'react';

class EpicsGrid extends React.Component {
  constructor() {
    super();

    this. _processStoriesData = this. _processStoriesData.bind(this);
  }

  componentWillMount() {
    var { stories, total_hits, total_hits_with_done, total_points_completed } = this.props.contributorStoriesRaw;

    var epicHash = this._processStoriesData(stories);

    this.setState({
      doneStories: (total_hits_with_done - total_hits),
      donePoints: total_points_completed,
      processedEpicData: epicHash
    })
    console.log('recursive!!!!')
  }

  componentWillReceiveProps(nextProps) {
    var { stories, total_hits, total_hits_with_done, total_points_completed } = nextProps.contributorStoriesRaw;
    console.log('stories in receive props', stories)

    var epicHash = this._processStoriesData(stories);
    console.log('before setState', epicHash)

    this.setState({
      doneStories: (total_hits_with_done - total_hits),
      donePoints: total_points_completed,
      processedEpicData: epicHash
    })
    console.log('recursive!!!!')
  }

  render() {
    console.log('got here')
    console.log('in render, state:', this.state.processedEpicData)

    // var epicNodes = this.state.processedEpicData.map(function(epic) {
    //   return(
    //     <EpicNode
    //       name={epic.name}
    //       nodeStyle={epic.color} />
    //   )
    // });

    return(
      <div className="epicsGrid">
        {this.state.processedEpicData}
      </div>
    );
  }

  _processStoriesData(stories) {
    var epicHash = {};

    stories.map(function(story){
      var estimate = story.estimate || 0;
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
    return epicHash;
  }
}

export default EpicsGrid;
