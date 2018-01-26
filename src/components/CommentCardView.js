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
        { this.props.cardMode === 1 &&
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
              { this.props.data.Image &&
                <img src={this.props.data.Image} alt="image"/>
              }
              { this.props.data.Image === '_' &&
                <img src="https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF" />
              }
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
      </Card>
    );
  }

}

export default CommentCardView;
