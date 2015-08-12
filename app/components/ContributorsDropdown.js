import React from 'react';
import Dropdown from './Dropdown';

class ContributorsDropdown extends React.Component{
  render() {
    var { contributorsRaw } = this.props;
    var contributorsData = this._processContributorsRaw(contributorsRaw);
    // console.log(contributorsData)

    return(
      <Dropdown
        label="Contributors"
        dropdownObjects={contributorsData}
        onDropdownSelect={function(){console.log('selected!')}} 
        disabled={this.props.disabled} />
    )
  }

  _processContributorsRaw(contributorsRaw) {
    // console.log('mappin!')
    if (contributorsRaw === null) {
      return [];
    }

    return contributorsRaw.map(function(json) {
      return(
        json.person
      )
    })
  }
}

export default ContributorsDropdown;

