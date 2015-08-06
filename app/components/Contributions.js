import React from 'react';

class Contributions extends React.Component {

  constructor(){
    super();
    this. _buildRow = this. _buildRow.bind(this);
  }

  render() {
    var contributors = this.props.contributors;

    var contributorRows = [];

    for(var key in contributors) {
      contributorRows.push(this._buildRow(contributors[key]));
    }

    return (
      <table>
        <tr>
          <td>Initials</td>
          <td>Total Points</td>
          <td>Total Story Count</td>
        </tr>
        {contributorRows}
      </table>
    );
  }

  _buildRow(subject){
    return (
        <tr>
          <td>{subject.initials}</td>
          <td>{subject.total_points}</td>
          <td>{subject.total_stories}</td>
        </tr>
    );
  }
}

export default Contributions;
