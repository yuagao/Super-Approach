import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import CommentCardView from './CommentCardView';
import background from '../images/bg.png';


class StatusView extends Component {

  handleBackToReport = () => {
    this.props.onBackToReport();
  }

  render() {
    // Mock up data
    const features = [
      {
        OBJECTID: 101,
        Image: 'https://c1.staticflickr.com/1/50/116979961_a36483f62a.jpg',
        Time: '1/2/2018 12:00:00 AM',
        Content: 'The yard has not been mowed in months.',
        Category: 'Quality of Life',
        Progress: 'new'
      },
      {
        OBJECTID: 102,
        Image: 'https://www.urbanghostsmedia.com/wp-content/uploads/2014/08/abandoned-cars-reliant-scimitar-graveyard-uk-4.jpg',
        Time: '1/2/2018 12:00:00 AM',
        Content: 'There is an abandoned Murano at here for years',
        Category: 'Parking & Vehicles',
        Progress: 'done'
      },
      {
        OBJECTID: 103,
        Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1o2ajmRWZNoiMaM8WUF5aOcznxtuToz2zfaiPkk3zTXXFUgNcw',
        Time: '1/2/2018 12:00:00 AM',
        Content: 'Branches on the ground due to strong winds.',
        Category: 'Trees & Parks',
        Progress: 'in progress'
      }
    ];

    const listItems = features.map((feature) =>
      <CommentCardView
        key={feature.OBJECTID.toString()}
        data={feature}
        isActionDisplayed = {false}
        isProgressDisplayed={true}
        cardMode={3}
      />
    );

    const bgStyle = {
      backgroundImage:"url(" + background + ")",
    };

    return (
      <div id="statusView" className="subPage" style={bgStyle}>

        <div className="headerContainer">
          <IconButton onClick={this.handleBackToReport}>
            <i className="material-icons">arrow_back</i>
          </IconButton>
          <span className="title">
            <i className="material-icons">track_changes</i>
            <h1 className="header">Status</h1>
          </span>
        </div>

        <div className="commentList">
          {listItems}
        </div>

      </div>
    );
  }

}

export default StatusView;
