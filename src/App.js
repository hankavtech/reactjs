import React, { Component } from 'react'
import SportIcons from './components/SportIcons'
import Tournaments from './components/Tournaments'

export default class App extends Component {

  constructor(props){
    super(props);
    this.changeSport = this.changeSport.bind(this);
    this.state={tournaments:[],events:[],sport:'soccer'};
    this.getData('soccer');
}


  getData = (sportName) => {
    const url = `http://www.localhost:8000/${sportName}/`;
    fetch(url, {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
    .then(response => {
    if (response.ok) {
    response.json().then(json => {
    this.setState({events:json});
    var flags=[];
    var uniqueTournaments = [];
    var index;
    for (index = 0; index < this.state.events.length; ++index) {
        var event=this.state.events[index];
        var uniqueCombination="";
        switch(this.state.sport){
          case 'tennis':
            uniqueCombination=this.state.events[index].event_type+this.state.events[index].event_name;
            break;
          
          default:
            uniqueCombination=this.state.events[index].country+this.state.events[index].league;
            break;
        }
        
        if (!flags[uniqueCombination]) {
            flags[uniqueCombination] = true;
            switch(this.state.sport){
              case 'tennis':
                uniqueTournaments.push({'event_name':event.event_name,'event_type':event.event_type});
                break;
              
              default:
                uniqueTournaments.push({'event_name':event.league,'event_type':event.country});
                break;
            }
            
        }
    }


    this.setState({tournaments:uniqueTournaments})
    });
    }
    });

  }

  changeSport = (sportName) => {
    this.setState({sport:sportName},this.getData(sportName));
    
  }



  render() {
    return (
      <div>
        <SportIcons currentSport={this.state.sport} changeActiveSport={this.changeSport} />
        <Tournaments currentSport={this.state.sport} tournaments={this.state.tournaments} events={this.state.events}/>
      </div>
    )
  }
}
