import React from 'react';
import Dropdown from './Dropdown';


class ProjectDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    <Dropdown
      dropdownItems={this.state.epics}
      onDropdownSubmit={function(){return null;}} /> :
    null
  }

}

export default ProjectDropdown;
