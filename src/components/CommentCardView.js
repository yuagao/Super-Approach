import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TimeAgo from 'react-time-ago';
import halfOwl from '../images/half-owl.png';
import 'react-time-ago/Tooltip.css'


class CommentCardView extends Component {

  constructor(props) {
    super(props);
    this.count = {
      LikeIt: this.props.data.LikeIt,
      DislikeIt: this.props.data.DislikeIt
    };
    //UI flags
    this.likeBtnDisabled = false;
    this.likeBtnHighlight = false;
    this.dislikeBtnDisabled = false;
    this.dislikeBtnHighlight = false;
    this.isClickable = true;
  }

  handleLikeClicked = () => {
    if (this.isClickable) {
      this.count.LikeIt = this.count.LikeIt+ 1;
      this.likeBtnHighlight = true;
      this.dislikeBtnDisabled = true;
      this.forceUpdate();
      this.props.onLikeComment(this.props.data.OBJECTID, true, this.props.data.LikeIt + 1);
      this.isClickable = false;
    }

  }

  handleDislikeClicked = () => {
    if (this.isClickable) {
      this.count.DislikeIt = this.count.DislikeIt+ 1;
      this.dislikeBtnHighlight = true;
      this.likeBtnDisabled = true;
      this.forceUpdate();
      this.props.onLikeComment(this.props.data.OBJECTID, false, this.props.data.DislikeIt + 1);
      this.isClickable = false;
    }
  }

  render() {
    const labelStyle = {
      fontSize: '12px'
    }
    if (this.props.isProgressDisplayed) {
      var progressBarStyle;
      var highlightBarStyle;
      switch (this.props.data.Progress) {
        case 'new':
          progressBarStyle = {
            backgroundColor: 'rgba(248,159,27,.2)'
          };
          highlightBarStyle = {
            backgroundColor: 'rgba(248,159,27,1)',
            width: '20%'
          };
          break;
        case 'in progress':
          progressBarStyle = {
            backgroundColor: 'rgba(50,113,127,.2)'
          };
          highlightBarStyle = {
            backgroundColor: 'rgba(50,113,127,1)',
            width: '80%'
          };
          break;
        case 'done':
          progressBarStyle = {
            backgroundColor: 'rgba(76,108,76,1)'
          };
          highlightBarStyle = {
            backgroundColor: 'rgba(76,108,76,1)',
            width: '100%'
          };
          break;
        default:
          break;
      }
    }

    return (
      <Card className="commentCard">
        { (this.props.cardMode === 1 || this.props.cardMode === 2)  &&
          <img className="owl" src={halfOwl} alt="owl"/>
        }
        <CardText>
          <div className="flex">
            <div className="contentLeft">
              <span className="category">{this.props.data.Category}</span>
              <span className="content">{this.props.data.Content}</span>
              <div className="flex">
                { this.props.cardMode === 0 &&
                  <span className="time">
                    <TimeAgo>{this.props.data.Time}</TimeAgo>
                  </span>
                }
                { this.props.cardMode === 1 &&
                  <span className="time">
                    <TimeAgo>{this.props.data.Time}</TimeAgo>
                  </span>
                }
                <span className="status">{this.props.data.Status}</span>
              </div>
            </div>
            <div className="contentRight">
              <img src={this.props.data.Image} alt="thumbnail"/>
            </div>
          </div>
        </CardText>
        { this.props.isActionDisplayed &&
          <CardActions className="cardActions">
            <FlatButton
              label={"I feel the same (" + this.count.LikeIt+ ")" }
              labelStyle={labelStyle}
              icon={<FontIcon className="material-icons"> thumb_up</FontIcon>}
              onClick={this.handleLikeClicked}
              primary = {this.likeBtnHighlight}
              disabled={this.likeBtnDisabled}
              />
            <FlatButton
              label={"I don't think so (" + this.count.DislikeIt+ ")" }
              labelStyle={labelStyle}
              icon={<FontIcon className="material-icons"> thumb_down</FontIcon>}
              onClick={this.handleDislikeClicked}
              primary = {this.dislikeBtnHighlight}
              disabled={this.dislikeBtnDisabled}
            />
          </CardActions>
        }
        { this.props.isProgressDisplayed &&
          <div className="progressBar" style={progressBarStyle}>
            <div className="highlightBar " style={highlightBarStyle}>
              <span className="subHeader">{this.props.data.Progress} </span>
            </div>
          </div>
        }
      </Card>
    );
  }

}

export default CommentCardView;
