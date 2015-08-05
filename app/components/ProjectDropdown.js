import React from 'react';

class ProjectDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    var projectNames = this.props.projectNames.map(function(name) {
      return (
          <option>{name}</option>
        );
    });

    return (
      <select>
        {projectNames}
      </select>
    );
  }

}

export default ProjectDropdown;
