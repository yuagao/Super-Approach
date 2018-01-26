import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../images/logo.svg';


class SplashView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadImageUrl: null
    }
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

  hanldeImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    if (file){
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e)
        this.setState({
          uploadImageUrl: e.target.result
        })
      }

    }
  }

  render() {
    return (
      <div id="splashView" className="subPage">
        <img src={logo} alt="logo"/>
        <img src={this.state.uploadImageUrl} />
        <input type="file" accept="image/*" onChange={this.hanldeImageUpload}/>
        <RaisedButton label="get current location" onClick={this.getlocation}/>
      </div>
    );
  }
}

export default SplashView;
