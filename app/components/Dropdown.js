import React from 'react';

class Dropdown extends React.Component {

  constructor(){
    super();
    this. _handleChange = this. _handleChange.bind(this);
    this. _findSelectedValue = this. _findSelectedValue.bind(this);
    this. _generateOptions = this. _generateOptions.bind(this);
  }

  render() {
    var subjects = this.props.dropdownItems;
    var options = this._generateOptions(subjects);

    return (
      <select onChange={this._handleChange} ref={'selector'}>
        {options}
      </select>
    );
  }

  _handleChange(e) {
    e.preventDefault();
    var selected = this._findSelectedValue();
    this.props.onDropdownSubmit(e, selected);
    this.forceUpdate();
  }

  _findSelectedValue() {
    return React.findDOMNode(this.refs.selector).value.trim();
  }

  _generateOptions(subjects) {
    return subjects.map(function(item, i) {
      return (
          <DropdownOption key={i} itemId={item.id} itemName={item.name} />
        );
    });

  }

}

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
