import React from 'react';

class Dropdown extends React.Component {

  constructor(){
    super();
    this. _handleChange = this. _handleChange.bind(this);
    this. _findSelectedValue = this. _findSelectedValue.bind(this);
    this. _generateOptions = this. _generateOptions.bind(this);
  }

  render() {
    var { dropdownObjects } = this.props;

    var options = this._generateOptions(dropdownObjects);

    return (
      <select onChange={this._handleChange} ref={'dropdown'}>
        {options}
      </select>
    );
  }

  _handleChange(e) {
    e.preventDefault();
    var selected = this._findSelectedValue();
    this.props.onDropdownSelect(e, selected);
  }

  _findSelectedValue() {
    return React.findDOMNode(this.refs.dropdown).value.trim();
  }

  //dropdownObjects is list with [{id: 123, name: Epic}], ...}
  _generateOptions(dropdownObjects) {
    var sortedNames = this._sortObjectNames(dropdownObjects);
    return sortedNames.map(function(item, i) {
      return (
          <DropdownOption key={i} itemId={item.id} itemName={item.name} />
        );
    });
  }

  _sortObjectNames(dropdownObjects){
    return dropdownObjects.sort(function(a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }
}

//TODO: undo this class?
class DropdownOption extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <option
        key={this.props.key}
        value={this.props.itemId}>
        {this.props.itemName}
      </option>
    );
  }

}

export default Dropdown;
