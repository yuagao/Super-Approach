import React, { Component } from 'react';
import CommentCardView from './CommentCardView'
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import logo from '../images/logo.svg';


class ReportView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      featuresAround: this.props.featuresAround,
      pageStatus: 0
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
    console.log(category);
    this.setState({
      pageStatus: 2
    })
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
    return (
      <div>
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
            <div>
              {listItems}
            </div>
            <FloatingActionButton onClick={this.handleAddNew}>
              <ContentAdd />
            </FloatingActionButton>
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
                hintText="Full width"
                fullWidth={true}
              />
            </div>

          </div>
        }


      </div>
    )
  }
}

export default ReportView;
