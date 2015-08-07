import React from 'react';
import { Form, ButtonInput, Button, Input } from 'react-bootstrap';


class TokenForm extends React.Component {

  constructor(){
    super();
    this. _handleSubmit = this. _handleSubmit.bind(this);
  }

  render() {
    var styles = {
      form: {
        width: '250px'
      },
      inline: {
        display: 'inline-block'
      }
    }

    return (

      <form style={styles.form} className="tokenForm" onSubmit={this._handleSubmit}>
        <div style={styles.inline}>
          <Input standalone={true} type="text" placeholder="Your Tracker Token" ref="token" className="form-control"/>
        </div>
        <Button bsStyle='success' type="submit">submit</Button>
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
