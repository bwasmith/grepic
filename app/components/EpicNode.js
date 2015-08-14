import React from 'react';
import { Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import helpers from '../utils/helpers';

class EpicNode extends React.Component{
  render() {
    var { colorKey, colorFn, points, stories } = this.props;

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
    var overlay = <Popover>
                    {`Total Pseudo Points: ${points}\n`} <br/>
                    {`Total Stories: ${stories}`} <br/>
                  </Popover>

    return(
      <Col style={colStyle} key={this.props.name} md={4}>
        <OverlayTrigger trigger='click' placement='right' overlay={overlay}>
          <Button style={buttonStyle} >
            {this.props.name}
          </Button>
        </OverlayTrigger>
      </Col>
    )
  }
}

export default EpicNode
