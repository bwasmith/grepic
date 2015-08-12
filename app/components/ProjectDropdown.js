import React from 'react';
import Dropdown from './Dropdown';


class ProjectDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    var { projectsRaw } = this.props;

    return (
      <Dropdown
        label="Projects"
        dropdownObjects={projectsRaw}
        onDropdownSelect={this.props.onProjectSelect} />
    );
  }
}

export default ProjectDropdown;
