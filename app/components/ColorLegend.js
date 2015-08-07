import React from 'react';
import helpers from '../utils/helpers';
import LegendItem from './LegendItem';
import { Button, Input } from 'react-bootstrap';

class ColorLegend extends React.Component{
  constructor() {
    super();
    this. _setSampleColor = this. _setSampleColor.bind(this);
    this. _changeLevelUpVal = this. _changeLevelUpVal.bind(this);
    this. _handleSampleKeyDown = this. _handleSampleKeyDown.bind(this);
  }

  render() {

    var style = {
      wandering: {
        backgroundColor: this._hsl(WANDERING)
      },
      comfy: {
        backgroundColor: this._hsl(COMFY)
      },
      soloReady: {
        backgroundColor: this._hsl(SOLOREADY)
      },
      architect: {
        backgroundColor: this._hsl(ARCHITECT)
      },
      anchor: {
        backgroundColor: this._hsl(ANCHOR)
      },
      form: {
        width: '163px'
      },
      container: {
        float: 'right'
      },
      sample: {
        button: {
          marginTop: '15px',
          borderRadius: '10px 0 0 10px',
          fontSize: '18px',
          width: '110px'
        },
        input: {
          marginTop: '15px',
          borderRadius: '0 10px 10px 0',

        }
      },
      help: {
        fontSize: '11px',
        color: 'gray',
        fontStyle: 'italic',
        width: '80%'
      }
    };

    var sampleColorButton =
    <Button
      style={style.sample.button}
      ref='sampleButton'
      onClick={this._setSampleColor}>
      Calculate!
    </Button>;

    return(
      <div style={style.container}>
        <form style={style.form} id="colorLegend">

          <LegendItem
            id={"wandering"}
            color={style.wandering}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.props.colorKey.wandering}
            topEl={true} />

          <LegendItem
            id={"comfy"}
            color={style.comfy}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.props.colorKey.comfy} />

          <LegendItem
            id={"soloReady"}
            color={style.soloReady}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.props.colorKey.soloReady}
            name={"solo ready"} />

          <LegendItem
            id={"architect"}
            color={style.architect}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.props.colorKey.architect} />

          <LegendItem
            id={"anchor"}
            color={style.anchor}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.props.colorKey.anchor}
            bottomEl={true} />

          <Input bsSize="large" type="text" ref="sample"
            style={style.sample.input}
            buttonBefore={sampleColorButton}
            onKeyDown={this._handleSampleKeyDown} />

          <div style={style.help}>
            choose custom point threshholds to measure the level of a person
          </div>
        </form>


      </div>
    )
  }

  _setSampleColor(colorKey = this.props.colorKey) {
    //the button onClick will set colorKey to an mouse event instance
    if(colorKey.type === "click") colorKey = this.props.colorKey;

    var colorFn = helpers.generateColorFn(colorKey);
    var subject = React.findDOMNode(this.refs.sample.getInputDOMNode());
    var points = parseInt(subject.value);
    var sampleButton = React.findDOMNode(this.refs.sampleButton);

    sampleButton.style.backgroundColor = helpers.setColor(colorFn, points, colorKey);
  }

  _changeLevelUpVal(e) {
    //TODO: validate key setting by not allowing a value to exceed next value, or to be less than previous value
    var level = e.target.id;
    var points = parseInt(e.target.value);
    //when empty, NaN is returned, which is false
    if(!Number.isInteger(points)) return;

    var colorKey = this.props.colorKey;

    colorKey[level] = points;
    this.props.onLegendChange(colorKey);

    this._setSampleColor(colorKey);
  }

  _hsl(hue) {
    return "hsl(" + hue + ",100%,50%)"
  }

  _handleSampleKeyDown(e) {
    if(e.key === 'Enter') {
      this._setSampleColor();
    }
    return;
  }
}

export default ColorLegend;
