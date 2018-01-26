import React, { Component } from 'react';
import logo from '../images/logo.svg';


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
    return (
      <div id="splashView" className="subPage">
        <img src={logo} alt="logo"/>
      </div>
    );
  }
}

export default SplashView;
