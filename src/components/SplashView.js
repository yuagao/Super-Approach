import React, { Component } from 'react';
import splash from '../images/splash.gif';
import background from '../images/bg.png';


class SplashView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getlocation();
  }

  getlocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const queryPoint = {
        y: Number(position.coords.latitude.toFixed(3)),
        x: Number(position.coords.longitude.toFixed(3))
      }

      this.props.onGetCurrentLocation(queryPoint)
    }, (err) => {
      console.log(err);
    });
  }



  render() {
    const bgStyle = {
      backgroundImage:"url(" + background + ")",
    };
    return (
      <div id="splashView" className="subPage" style={bgStyle}>
        <img src={splash} height="140" width="140" alt="splash"/>
        <span className="subHeader"> Getting your current location... </span>
      </div>
    );
  }
}

export default SplashView;
