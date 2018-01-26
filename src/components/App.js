import React, { Component } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/App.css';
import SplashView from './SplashView';
import MapView from './MapView';
import MapUIView from './MapUIView';
import ReportView from './ReportView';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {

  constructor(props) {
    super(props);
    TimeAgo.locale(en);
    this.state = {
      queryPoint: {
        x: null,
        y: null
      },
      featuresAround: null,
      currentSelection: null,
      pageStatus: 0
    }
    this.fakeCurrentLocation = {
      x: -122.413,
      y: 37.767
    }
  }

  handleMapClicked = (evt) => {
    this.setState({
      currentSelection : evt
    })
  }

  handleQueryResultsReturned = (results) => {
    this.setState({
      featuresAround : results
    })
  }

  handleGetCurrentLocation = (point) => {
    console.log(point);
    this.setState({
      pageStatus: 1
    })
    // Fake Location Info
    this.setState({
      queryPoint:{
        x: this.fakeCurrentLocation.x,
        y: this.fakeCurrentLocation.y
      }
    })
  }

  handleToggleToMapView = () => {
    this.setState({
      pageStatus: 2
    })
  }
  handleToggleToReportView = () => {
    this.setState({
      pageStatus: 1
    })
    // Fake Location Info
    this.setState({
      queryPoint:{
        x: this.fakeCurrentLocation.x,
        y: this.fakeCurrentLocation.y
      }
    })
  }

  handleCommentLike(id, isLike) {

  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="page">
          { this.state.pageStatus === 0 &&
            <SplashView onGetCurrentLocation={this.handleGetCurrentLocation}/>
          }
          { this.state.pageStatus === 1 &&
            <ReportView
              featuresAround = {this.state.featuresAround}
              onToggleToMapView = {this.handleToggleToMapView}
              onCommentLike = {this.handleCommentLike}
              queryPoint = {this.state.queryPoint}
            />
          }
          { this.state.pageStatus === 2 &&
            <MapUIView
              currentSelection = {this.state.currentSelection}
              onToggleToReportView = {this.handleToggleToReportView}
            />
          }
          <MapView
            isDisplayed={(this.state.pageStatus === 2? true : false)}
            queryPoint={this.state.queryPoint}
            onQueryResultsReturned={this.handleQueryResultsReturned}
            onMapClicked={this.handleMapClicked}
          />
      </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
