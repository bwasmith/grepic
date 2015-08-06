import React from 'react';
import Dropdown from './Dropdown';

class EpicDropdown extends React.Component {

  constructor(){
    super();
    this. _marshalEpics = this. _marshalEpics.bind(this)
  }

  render() {
    var epicList = this._marshalEpics();

    return (
      <Dropdown
      dropdownItems={epicList}
      onDropdownSelect={this.props.onEpicSelect} />
    );
  }

  _marshalEpics() {
    return this.props.epics;
  }
}

export default EpicDropdown;
