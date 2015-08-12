import React from 'react';
import Dropdown from './Dropdown';

class EpicDropdown extends React.Component {

  render() {
    var { epicsRaw, onEpicSelect } = this.props;

    return (
      <Dropdown
        label="Epics"
        dropdownObjects={epicsRaw}
        onDropdownSelect={onEpicSelect}
        disabled={this.props.disabled} />
    );
  }
}

export default EpicDropdown;
