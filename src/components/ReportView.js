import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import owl from '../images/owl.svg';
import background from '../images/bg.png';

class ReportView extends Component {

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
    this.showPreviewImage = false;
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


  handleLikeComment = (id, isLike, number) => {
    this.props.onLikeComment(id, isLike, number);
  }

  handleAddNew = () => {
    this.props.onCreateNewComment();
  }


  render() {

    const features = this.state.featuresAround;
    let listItems = '';
    if (features) {
      listItems = features.map((feature) =>
        <CommentCardView
          key={feature.attributes.OBJECTID.toString()}
          data={feature.attributes}
          isActionDisplayed = {true}
          onLikeComment={this.handleLikeComment}
          cardMode={0}
        />
      );
    }

    const bgStyle = {
      backgroundImage:"url(" + background + ")",
    };
    return (
      <div id="reportView" className="subPage" style={bgStyle}>
          <div className="container">
            <div className="welcomeContainer flex" style={bgStyle}>
              <span className="flex">
                <img src={owl} alt="owl"/>
                <h1 className="header">Hi There!</h1>
              </span>
              <p className="subHeader">Help your neighborhood to grow by just several clicks!</p>
            </div>
            <div className="actionContainer">
              <FloatingActionButton onClick={this.handleAddNew} className='addBtn'>
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton className='orderBtn'>
                <i className="material-icons">track_changes</i>
              </FloatingActionButton>
              <div className="flex">
                <div className="subHeader2">
                  {this.featuresCount} NEARYBY COMMENTS
                </div>
                <span className="mapBtn" onClick={this.goToMap}> Map View</span>
              </div>

            </div>

            <div className="commentList">
              {listItems}
            </div>
          </div>
      </div>
    )
  }
}

export default ReportView;
