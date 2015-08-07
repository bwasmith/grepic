import React from 'react';
import Dropdown from './Dropdown';

class EpicDropdown extends React.Component {

  render() {
    var { epicsRaw, onEpicSelect } = this.props;

    return (
      <Dropdown
        dropdownObjects={epicsRaw}
        onDropdownSelect={onEpicSelect} />
    );
  }
}

export default EpicDropdown;
