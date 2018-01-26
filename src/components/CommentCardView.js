import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TimeAgo from 'react-time-ago';
import 'react-time-ago/Tooltip.css'


class CommentCardView extends Component {

  constructor(props) {
    super(props);
    this.count = {
      LikeIt: this.props.data.LikeIt,
      DislikeIt: this.props.data.DislikeIt
    };
    this.likeBtnDisabled = false;
    this.likeBtnHighlight = false;
    this.dislikeBtnDisabled = false;
    this.dislikeBtnHighlight = false;
  }

  handleLikeClicked = () => {
    this.count.LikeIt = this.count.LikeIt+ 1;
    this.likeBtnHighlight = true;
    this.dislikeBtnDisabled = true;
    this.forceUpdate();
  }

  handleDislikeClicked = () => {
    this.count.DislikeIt = this.count.DislikeIt+ 1;
    this.dislikeBtnHighlight = true;
    this.likeBtnDisabled = true;
    this.forceUpdate();
  }

  render() {
    const labelStyle = {
      fontSize: '12px'
    }
    return (
      <Card className="commentCard">
        <CardText>
            <div className="contentLeft">
              <span className="category">{this.props.data.Category}</span>
              <span className="content">'"'+{this.props.data.Content}+'"'</span>
              <div className="flex">
                <span className="time">
                  <TimeAgo>{this.props.data.Time}</TimeAgo>
                </span>
                <span className="status">{this.props.data.Status}</span>
              </div>
            </div>
            <div className="contentRight">
              <img src={this.props.data.Image} />
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
      </Card>
    );
  }

}

export default CommentCardView;
