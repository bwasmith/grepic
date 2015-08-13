import React from 'react';
import Dropdown from './Dropdown';

class ContributorsDropdown extends React.Component{
  render() {
    var { contributorsRaw, onContributorSelect } = this.props;
    var contributorsData = this._processContributorsRaw(contributorsRaw);
    // console.log(contributorsData)

    return(
      <Dropdown
        label="Contributors"
        dropdownObjects={contributorsData}
        onDropdownSelect={onContributorSelect}
        disabled={this.props.disabled} />
    )
  }

  _processContributorsRaw(contributorsRaw) {
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

