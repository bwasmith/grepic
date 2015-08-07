import React from 'react';
import helpers from '../utils/helpers';
import LegendItem from './LegendItem';
import { Button, Input } from 'react-bootstrap';

class ColorLegend extends React.Component{
  constructor() {
    super();
    this. _setSample = this. _setSample.bind(this);
    this. _changeLevelUpVal = this. _changeLevelUpVal.bind(this);
    this. _handleSampleKeyDown = this. _handleSampleKeyDown.bind(this);

    var colorKey = {
        wandering: 0,
        comfy: 4,
        soloReady: 10,
        architect: 18,
        anchor: 28
      };
    this.state = {
      colorKey: colorKey ,
      colorFn: helpers.generateColorFn(colorKey),
      points: 0
    };
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
          borderRadius: '10px 0 0 10px'
        },
        input: {
          marginTop: '15px',
          borderRadius: '0 10px 10px 0'
        }
      },
      help: {
        fontSize: '11px',
        color: 'gray',
        fontStyle: 'italic',
        width: '80%'
      }
    };

    var sampleColorButton = <Button style={style.sample.button} ref='sampleButton' onClick={this._setSample}>Calculate!</Button>

    return(
      <div style={style.container}>
        <form style={style.form} id="colorLegend">

          <LegendItem
            id={"wandering"}
            color={style.wandering}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.state.colorKey.wandering}
            topEl={true} />

          <LegendItem
            id={"comfy"}
            color={style.comfy}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.state.colorKey.comfy} />

          <LegendItem
            id={"soloReady"}
            color={style.soloReady}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.state.colorKey.soloReady}
            name={"solo ready"} />

          <LegendItem
            id={"architect"}
            color={style.architect}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.state.colorKey.architect} />

          <LegendItem
            id={"anchor"}
            color={style.anchor}
            onLegendChange={this._changeLevelUpVal}
            defaultVal={this.state.colorKey.anchor}
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

  _setSample() {
    var subject = React.findDOMNode(this.refs.sample.getInputDOMNode());
    var points = parseInt(subject.value);
    var sampleButton = React.findDOMNode(this.refs.sampleButton);
    this.setState({
      points: points
    })
    console.log('hue: f(points):', points, this.state.colorFn(points));


    sampleButton.style.backgroundColor = helpers.setColor(this.state.colorFn, points, this.state.colorKey);
  }

  _changeLevelUpVal(e) {
    //TODO: validate key setting by not allowing a value to exceed next value, or to be less than previous value
    var level = e.target.id;
    var points = parseInt(e.target.value);
    var colorKey = this.state.colorKey;

    colorKey[level] = points;
    this.setState({
      colorKey: colorKey,
      colorFn: helpers.generateColorFn(colorKey)
    });

    console.log('updated colorkey:', this.state.colorKey);
  }

  _hsl(hue) {
    return "hsl(" + hue + ",100%,50%)"
  }

  _handleSampleKeyDown(e) {
    if(e.key === 'Enter') {
      this._setSample();
    }
    return;
  }
}

export default ColorLegend;
