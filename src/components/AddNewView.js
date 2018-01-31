import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import MapView from './MapView';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import car from '../images/car_button.svg';
import dump from '../images/dump_button.svg';
import life from '../images/life_button.svg';
import snow from '../images/snow_button.svg';
import traffic from '../images/traffic_button.svg';
import tree from '../images/tree_button.svg';
import owl from '../images/owl.svg';
import background from '../images/bg.png';
import camera from '../images/camera.png';

class AddNewView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageStatus: 0,
      uploadImageUrl: null
    };
    this.currentSelection = {
      Category: null,
      Image: null,
      Time: null,
      Content: null,
      LikeIt: 0,
      DislikeIt: 0,
      Status: 'New',
      Flag: 0
    };
    this.showPreviewImage = false;
  }

  handleCategorySelected = (category) => {
    this.currentSelection.Category = category
    this.setState({
      pageStatus: 1
    })
  }

  handleProceedToCamera = (evt) => {
    const input = document.getElementById('descriptionInput');
    this.currentSelection.Content = input.value;
    this.setState({
      pageStatus: 2
    })
  }

  handleUploadImageBtnClicked = () => {
    const input = document.getElementById('imageInput');
    input.click();
    this.showPreviewImage = true;
    this.forceUpdate();
  }


  handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    if (file){
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.setState({
          uploadImageUrl: e.target.result
        })
      }

    }
  }

  handleProceedToConfirm = () => {
    this.currentSelection.Image = this.state.uploadImageUrl;
    this.currentSelection.Time = this.getTimeNow();
    console.log(this.currentSelection);
    this.setState({
      pageStatus: 3
    })
  }

  handleConfirmClicked = () => {
    this.setState({
      pageStatus: 4
    });
    this.currentSelection = {
      Category: null,
      Image: null,
      Time: null,
      Content: null,
      LikeIt: 0,
      DislikeIt: 0,
      Status: 'New',
      Flag: 0
    };
  }

  handleBackToList= () => {
    this.props.onToggleToReportView();
  }

  getTimeNow() {
    const today = new Date();
    const date = today.toLocaleString('en-US', { month:'numeric', day: 'numeric', year: 'numeric'});
    const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    const result = date + ' '+ time;
    return result;
  }

  render() {

    const styleHeight = {
      height: '100%'
    };

    const bgStyle = {
      backgroundImage:"url(" + background + ")",
    };

    return (
      <div id="addNewView" className="subPage" style={bgStyle}>
      { this.state.pageStatus === 0 &&
        <div className="newCommentPage">
          <h1 className="header">Which category would you like to report?</h1>
          <div className="categoryList">
            <span className="category" onClick={() => {
                this.handleCategorySelected('Quality of Life')
              }}>
              <img src={life} alt=""/>
              <span>Quality of Life</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Parking & Vehicles')
              }}>
              <img src={traffic} alt=""/>
              <span>Parking & Vehicles</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Streets & Sidewalks')
              }}>
              <img src={car} alt=""/>

              <span>Streets & Sidewalks</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Sanitation')
              }}>
            <img src={dump} alt=""/>
              <span>Sanitation</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Winter Conditions')
              }}>
            <img src={snow} alt=""/>
              <span>Winter Conditions</span>
            </span>
            <span className="category" onClick={() => {
                this.handleCategorySelected('Trees & Parks')
              }}>
              <img src={tree} alt=""/>
              <span>Trees & Parks</span>
            </span>
          </div>
        </div>
      }

      { this.state.pageStatus === 1 &&
        <div className="newCommentPage">
          <h1 className="header">Please describe your issue.</h1>
          <div className="textFieldContainer">
            <TextField
              id = "descriptionInput"
              hintText="Description"
              multiLine={true}
              rows={1}
            />
          </div>
          <div className="bottomBar">
            <RaisedButton label="next" onClick={this.handleProceedToCamera}/>
          </div>

        </div>
      }

      { this.state.pageStatus === 2 &&
        <div className="newCommentPage">
          <h1 className="header">A picture is worth a thousand words.</h1>
          <div>
            { this.showPreviewImage &&
              <img className="previewImage" src={this.state.uploadImageUrl} />
            }
            <div id="uploadImageBtn" className="uploadImageBtn" onClick={this.handleUploadImageBtnClicked}> <img src={camera} alt="upload button"/></div>
            <input className="hidden" id="imageInput" type="file" accept="image/*" onChange={this.handleImageUpload}/>
          </div>
          <div className="bottomBar">
            <RaisedButton label="next" onClick={this.handleProceedToConfirm}/>
          </div>

        </div>
      }

      { this.state.pageStatus === 3 &&
        <div style={styleHeight} className="newCommentPage thumbNailPage">
          <div className="thumbNailMap">
            <MapView
              isDisplayed = {true}
              queryPoint={this.props.queryPoint}
              onQueryResultsReturned={()=>{}}
              onMapClicked={()=>{}}
              hideFeatures={true}
            />
            <CommentCardView
              data={this.currentSelection}
              onCommentLike={()=>{}}
              isActionDisplayed = {false}
              cardMode={2}
            />
            <div className="bottomBar">
              <RaisedButton label="confirm" primary={true} onClick={this.handleConfirmClicked}/>
            </div>
          </div>


        </div>
      }

      { this.state.pageStatus === 4 &&
        <div className="newCommentPage thankPage">
          <div className="thankContainer">
            <img className = "owl" src={owl} alt="logo"/>
            <h1 className="header">Thank you for your contribution! </h1>
          </div>
          <div className="buttonContainer">
            <RaisedButton label="continue to browse" primary={true}  onClick={this.handleBackToList}/>
            <RaisedButton label="track status"/>
          </div>
        </div>
      }
      </div>
    );
  }

}

export default AddNewView;
