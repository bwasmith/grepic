import React from 'react';

class TokenForm extends React.Component {

  constructor(){
    super();
    this. _handleSubmit = this. _handleSubmit.bind(this);
  }

  render() {
    return (
      <form className="tokenForm" onSubmit={this._handleSubmit}>
        <input type="text" placeholder="Your Tracker Token" ref="token" />
        <input type="submit" value="Post" />
      </form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    var token = React.findDOMNode(this.refs.token).value.trim();
    if(!token){
      return;
    }
    this.props.onTokenSubmit(token);
    return;
  }
}

export default TokenForm;
