import React from 'react';
import { Input } from 'react-bootstrap';


class Dropdown extends React.Component {

  constructor(){
    super();
    this. _handleChange = this. _handleChange.bind(this);
    this. _generateOptions = this. _generateOptions.bind(this);
  }

  render() {
    var { dropdownObjects } = this.props;

    var options = this._generateOptions(dropdownObjects);
    return (
      <form>
        <Input 
          type='select' 
          label={this.props.label} 
          onChange={this._handleChange} 
          ref={'dropdown'}>
          <option> ... </option>
          {options}
        </Input>
      </form>
    );
  }

  _handleChange(e) {
    e.preventDefault();
    var selected = this.refs.dropdown.getValue();
    this.props.onDropdownSelect(e, selected);
  }

  //dropdownObjects is list with [{id: 123, name: Epic}, ...]
  _generateOptions(dropdownObjects) {
    var sortedNames = this._sortObjectNames(dropdownObjects);
    return sortedNames.map(function(item, i) {
      return (
          <option key={i} value={item.id}> {item.name} </option>
        );
    });
  }

  _sortObjectNames(dropdownObjects){
    return dropdownObjects.sort(function(a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }
}

export default Dropdown;
