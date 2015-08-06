import React from 'react';
import helpers from '../utils/helpers';

class ColorLegend extends React.Component{
  constructor() {
    super();
    this. _changePoints = this. _changePoints.bind(this);
    this. _changeKey = this. _changeKey.bind(this);

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
    };

    return(
      <div>
        <form id="colorLegend">
          <label style={style.wandering} htmlFor="wandering">wandering</label>
          <input type="text" id="wandering"
            onChange={this._changeKey}
            defaultValue={this.state.colorKey.wandering} />

          <label style={style.comfy} htmlFor="comfy">comfy</label>
          <input type="text" id="comfy"
            onChange={this._changeKey}
            defaultValue={this.state.colorKey.comfy} />

          <label style={style.soloReady} htmlFor="soloReady">solo ready</label>
          <input type="text" id="soloReady"
            onChange={this._changeKey}
            defaultValue={this.state.colorKey.soloReady} />

          <label style={style.architect} htmlFor="architect">architect</label>
          <input type="text" id="architect"
            onChange={this._changeKey}
            defaultValue={this.state.colorKey.architect} />

          <label style={style.anchor} htmlFor="anchor">anchor</label>
          <input type="text" id="anchor"
            onChange={this._changeKey}
            defaultValue={this.state.colorKey.anchor} />
        </form>

        <input onChange={this._changePoints} ref="points">Points done: {this.state.points}</input>
      </div>
    )
  }

  _changePoints() {
    var subject = React.findDOMNode(this.refs.points);
    var points = parseInt(subject.value);
    this.setState({
      points: points
    })
    console.log('hue: f(points):', points, this.state.colorFn(points));


    subject.style.backgroundColor = helpers.setColor(this.state.colorFn, points, this.state.colorKey);
  }

  _changeKey(e) {
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
}

export default ColorLegend;
