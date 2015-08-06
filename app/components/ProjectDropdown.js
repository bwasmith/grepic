import React from 'react';
import Dropdown from './Dropdown';


class ProjectDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    var projectList = this.props.projects;

    return (
      <Dropdown
      dropdownItems={projectList}
      onDropdownSelect={this.props.onProjectSelect} />
    );
  }
}

export default ProjectDropdown;
