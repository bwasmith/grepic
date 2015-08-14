import React from 'react';
import { Col, Button } from 'react-bootstrap';
import helpers from '../utils/helpers';

class EpicNode extends React.Component{
  render() {
    var { colorKey, colorFn, points } = this.props;
    console.log('colorKey: ', colorKey)
    console.log('colorFn: ', colorFn)
    console.log('points: ', points)
    var buttonColor = helpers.setColor(colorFn, points, colorKey);
    var buttonStyle = {
      width: '145px',
      height: '85px',
      whiteSpace: 'normal',
      backgroundColor: `${buttonColor}`
    }

    var colStyle = {
      paddingBottom: '25px'
    }

    return(
      <Col style={colStyle}key={this.props.name} md={4}>
        <Button style={buttonStyle} >
          {this.props.name}
        </Button>
      </Col>
    )
  }
}

export default EpicNode
