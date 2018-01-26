import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import MapView from './MapView';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import logo from '../images/logo.svg';


class ReportView extends React.Component {
z
  constructor(props) {
    super(props);
    this.state = {
      featuresAround: this.props.featuresAround,
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
    this.featuresCount = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.featuresAround !== this.state.featuresAround) {
      this.setState({
        featuresAround: nextProps.featuresAround
      });
      if (nextProps.featuresAround) {
        this.featuresCount = nextProps.featuresAround.length;
      }
    }
  }

  goToMap = () => {
    this.props.onToggleToMapView();
  }

  createNew = () => {

  }

  handleCommentLike = (id, isLike) => {
    this.props.onCommentLike(id, isLike);
  }

  handleAddNew = () => {
    this.setState({
      pageStatus: 1
    })
  }

  handleCategorySelected = (category) => {
    this.currentSelection.Category = category
    this.setState({
      pageStatus: 2
    })
  }

  handleProceedToCamera = (evt) => {
    const input = document.getElementById('descriptionInput');
    this.currentSelection.Content = input.value;
    this.setState({
      pageStatus: 3
    })
  }

  handleUploadImageBtnClicked = () => {
    const input = document.getElementById('imageInput');
    input.click();
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
      pageStatus: 4
    })
  }

  handleConfirmClicked = () => {
    this.setState({
      pageStatus: 5
    })
  }

  handleBackToList= () => {
    this.setState({
      pageStatus: 0
    })
  }

  getTimeNow() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    };

    if(mm<10){
      mm='0'+mm;
    };
    var result = dd+'/'+mm+'/'+yyyy;
    return result;
  }

  render() {

    const features = this.state.featuresAround;
    let listItems = '';
    if (features) {
      listItems = features.map((feature) =>
        <CommentCardView
          key={feature.attributes.OBJECTID.toString()}
          data={feature.attributes}
          onCommentLike={this.handleCommentLike}
        />
      );
    }

    const styleHeight = {
      height: '100%'
    };
    return (
      <div id="reportView" className="subPage">
        { this.state.pageStatus === 0 &&
          <div>
            <div>
              <h1>Hi There!</h1>
              <h2>Help your neighborhood to grow by providing your feedback or helping evaluting the existing feedback</h2>
            </div>
            <div>
              {this.featuresCount} Nearby Comments
            </div>
            <RaisedButton label="go to map" onClick={this.goToMap}/>
            <FloatingActionButton onClick={this.handleAddNew}>
              <ContentAdd />
            </FloatingActionButton>
            <div>
              {listItems}
            </div>
          </div>

        }

        { this.state.pageStatus === 1 &&
          <div>
            <h3>Category</h3>
            <div>
              <span onClick={() => {
                  this.handleCategorySelected('Quality of Life')
                }}>
                <img src={logo} />
                <span>Quality of Life</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Parking & Vehicles')
                }}>
                <img src={logo} />
                <span>Parking & Vehicles</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Streets & Sidewalks')
                }}>
                <img src={logo} />
                <span>Streets & Sidewalks</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Sanitation')
                }}>
                <img src={logo} />
                <span>Sanitation</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Winter Conditions')
                }}>
                <img src={logo} />
                <span>Winter Conditions</span>
              </span>
              <span onClick={() => {
                  this.handleCategorySelected('Trees & Parks')
                }}>
                <img src={logo} />
                <span>Trees & Parks</span>
              </span>
            </div>
          </div>
        }

        { this.state.pageStatus === 2 &&
          <div>
            <h3>Please describe your issue</h3>
            <div>
              <TextField
                id = "descriptionInput"
                hintText="Description"
                multiLine={true}
                rows={1}
              />
            </div>
            <RaisedButton label="next" onClick={this.handleProceedToCamera}/>

          </div>
        }

        { this.state.pageStatus === 3 &&
          <div>
            <h3>Take Photo</h3>
            <div>
              <img src={this.state.uploadImageUrl} />
              <div onClick={this.handleUploadImageBtnClicked}> Upload Image</div>
              <input className="hidden" id="imageInput" type="file" accept="image/*" onChange={this.handleImageUpload}/>
            </div>
            <RaisedButton label="next" onClick={this.handleProceedToConfirm}/>

          </div>
        }

        { this.state.pageStatus === 4 &&
          <div style={styleHeight}>
            <div className="thumbNailMap">
              <MapView
                isDisplayed = {true}
                queryPoint={this.props.queryPoint}
                onQueryResultsReturned={()=>{}}
                onMapClicked={()=>{}}
              />
              <CommentCardView
                data={this.currentSelection}
                onCommentLike={()=>{}}
              />
            </div>

            <RaisedButton label="next" onClick={this.handleConfirmClicked}/>
          </div>
        }

        { this.state.pageStatus === 5 &&
          <div>
            <div>
              <h3>Thank you</h3>
            </div>
            <RaisedButton label="next" onClick={this.handleBackToList}/>
          </div>
        }


      </div>
    )
  }
}

export default ReportView;
