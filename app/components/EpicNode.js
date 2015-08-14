import React from 'react';

class EpicNode extends React.Component{
  render() {
    return(
      <Col key={this.props.name} md={3}>
        <Button style={this.props.nodeStyle} >
          {this.props.name}
        </Button>
      </Col>
    )
  }
}

export default EpicNode
