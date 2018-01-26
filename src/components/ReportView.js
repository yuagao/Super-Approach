import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../images/logo.svg';

class ReportView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      featuresAround: this.props.featuresAround
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

  render() {

    const features = this.state.featuresAround;
    let listItems = '';
    if (features) {
      listItems = features.map((feature) =>
        <CommentCardView key={feature.attributes.OBJECTID.toString()}
                  data={feature.attributes}
                  onCommentLike={this.handleCommentDislike}
        />
      );
    }
    return (
      <div>
        <div>
          <h1>Hi There!</h1>
          <h2>Help your neighborhood to grow by providing your feedback or helping evaluting the existing feedback</h2>
        </div>
        <div>
          {this.featuresCount} Nearby Comments
        </div>
        <RaisedButton label="go to map" onClick={this.goToMap}/>
        <div>
          {listItems}
        </div>
        <RaisedButton label="create new" onClick={this.createNew}/>
      </div>
    )
  }
}

export default ReportView;
