import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TimeAgo from 'react-time-ago';
import 'react-time-ago/Tooltip.css'


class CommentCardView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLikeCliked = () => {
    this.props.onCommentLike(this.props.data.OBJECTID, true);
  }

  handleDislikeCliked = () => {
    this.props.onCommentLike(this.props.data.OBJECTID, false);
  }

  render() {
    const labelStyle = {
      'font-size': '12px'
    }
    return (
      <Card className="commentCard">
        <CardText>
          <span>Category: {this.props.data.Category}</span>
          <br/>
          <span>Content: {this.props.data.Content}</span>
          <br/>
          <span>Time: <TimeAgo>{this.props.data.Time}</TimeAgo></span>
          <br/>
          <span>Status: {this.props.data.Status}</span>
        </CardText>
        <CardActions className="cardActions">
          <FlatButton
            label={"I feel the same (" + this.props.data.LikeIt+ ")" }
            labelStyle={labelStyle}
            icon={<FontIcon className="material-icons"> thumb_up</FontIcon>}
            onclick={this.handleLikeCliked()}
            />
          <FlatButton
            label={"I don't think so (" + this.props.data.DislikeIt+ ")" }
            labelStyle={labelStyle}
            icon={<FontIcon className="material-icons"> thumb_down</FontIcon>}
            onclick={this.handleDislikeCliked()}
          />
        </CardActions>
      </Card>
    );
  }

}

export default CommentCardView;
