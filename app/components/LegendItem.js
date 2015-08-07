import React from 'react/addons';
import { Input, Button } from 'react-bootstrap';

class LegendItem extends React.Component{



  render() {
    var addons = React.addons;
    var { color, id, onLegendChange, defaultVal, name, topEl, bottomEl } = this.props;
    var roundTop = topEl ? '8px' : '0';
    var roundBottom = bottomEl ? '8px' : '0';
    var style = {
      button: {
        backgroundColor: `${color.backgroundColor}`,
        opacity: '1',
        cursor: 'default',
        color: 'black',
        fontSize: '18px',
        width: '110px',
        borderRadius: `${roundTop} 0 0 ${roundBottom}`
      },
      input: {
        borderRadius: `0 ${roundTop} ${roundBottom} 0`
      },
      div: {
        marginTop: '-1px'
      },
      level: {
        float: 'left'
      },
      points: {
        float: 'right'
      }
    }


    var title =
      <div>
        <div style={style.level}>level</div>
        <div style={style.points}>points</div>
      </div>;
    var legendColor = <Button style={style.button} disabled={true}>{name || id}</Button>

    return(
      <div style={style.div}>
        { topEl ? title : null }
        <Input bsSize="large" type="text" id={id}
          style={style.input}
          buttonBefore={legendColor}
          onChange={onLegendChange}
          defaultValue={defaultVal} />
      </div>
    )
  }
}

export default LegendItem;
