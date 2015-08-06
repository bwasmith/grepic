import React from 'react';

class Contributions extends React.Component {

  constructor(){
    super();
    this. _buildRow = this. _buildRow.bind(this);
  }

  render() {
    var contributors = this.props.contributors;
    var contributorList = [];

    for(var key in contributors) {
      contributorList.push({key: key, value: contributors[key]} );
    }

    return (
      <table>
        <tr>
          <td>Initials</td>
          <td>Total Points</td>
          <td>Total Story Count</td>
        </tr>
        {
          contributorList.map(function(contributor, i) {
            return (<ContributionsRow key={contributor.key + i} subject={contributor.value} />);
          })
        }
      </table>
    );
  }

  _buildRow(subject, id){
    return (
       <ContributionsRow key={id} subject={subject}/>
    );
  }
}

class ContributionsRow extends React.Component { 
  render() {
    var subject = this.props.subject;
    return (
        <tr>
          <TableDiv content={subject.initials}/>
          <TableDiv content={subject.total_points}/>
          <TableDiv content={subject.total_stories}/>
        </tr>
    );
  }
}

class TableDiv extends React.Component {
  render () {
    return (
      <td>{this.props.content}</td>
    );
  }
}

export default Contributions;
