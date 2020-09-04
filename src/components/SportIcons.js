import React from 'react';
import SportIcon from './SportIcon';

export default class SportIcons extends React.Component {


  changeActiveTab = (sportName) => {
    this.props.changeActiveSport(sportName);
  }

  render() {
    let sport=this.props.currentSport;
    let icons=['soccer','tennis','basketball','cricket','baseball','hockey'];
    let iconContent=icons.map( icon => <SportIcon sport={icon} activeSport={sport} changeSport={this.changeActiveTab.bind(this,icon)}/>);
    return (
      <div>
        {iconContent}
      </div>
    )
  }
}





