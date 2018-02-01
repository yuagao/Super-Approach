import React, { Component } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../styles/App.css';
import SplashView from './SplashView';
import MapView from './MapView';
import MapUIView from './MapUIView';
import ReportView from './ReportView';
import AddNewView from './AddNewView';
import StatusView from './StatusView';

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
      pageStatus: 0,
      commentLiked: {
        id: null,
        like: null,
        number: null
      }
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
    this.setState({
      pageStatus: 1
    })
    // Fake Location Info
    setTimeout(()=>{
      this.setState({
        queryPoint:{
          x: this.fakeCurrentLocation.x,
          y: this.fakeCurrentLocation.y
        }
      })
    },2000);

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

  handleCreateNewComment = () => {
    this.setState({
      pageStatus: 3
    })
  }

  handleViewStatus = () => {
    this.setState({
      pageStatus: 4
    })
  }


  handleLikeComment = (id, isLike, number) => {
    this.setState({
      commentLiked: {
        id: id,
        like: isLike,
        number: number
      }
    })
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#26675B',
      }
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="page">
          { this.state.pageStatus === 0 &&
            <SplashView
              onGetCurrentLocation={this.handleGetCurrentLocation}
            />
          }
          { this.state.pageStatus === 1 &&
            <ReportView
              featuresAround = {this.state.featuresAround}
              onToggleToMapView = {this.handleToggleToMapView}
              onCreateNewComment = {this.handleCreateNewComment}
              onViewStatus = {this.handleViewStatus}
              onLikeComment = {this.handleLikeComment}
              queryPoint = {this.state.queryPoint}
            />
          }
          { this.state.pageStatus === 2 &&
            <MapUIView
              currentSelection = {this.state.currentSelection}
              onToggleToReportView = {this.handleToggleToReportView}
              onLikeComment = {this.handleLikeComment}
            />
          }
          { this.state.pageStatus === 3 &&
            <AddNewView
              currentSelection = {this.state.currentSelection}
              queryPoint = {this.state.queryPoint}
              onToggleToReportView = {this.handleToggleToReportView}
              onViewStatus = {this.handleViewStatus}
            />
          }
          { this.state.pageStatus === 4 &&
            <StatusView
              onBackToReport = {this.handleToggleToReportView}
            />
          }
          <MapView
            isDisplayed={(this.state.pageStatus === 2? true : false)}
            queryPoint={this.state.queryPoint}
            onQueryResultsReturned={this.handleQueryResultsReturned}
            onMapClicked={this.handleMapClicked}
            commentLiked={this.state.commentLiked}
            hideFeatures={false}
          />
      </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
