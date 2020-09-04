import React, { Component } from 'react'
import Events from './Events'


export default class Tournaments extends Component {

 

    getEvents = (tournament,type) => {

        let filteredEvents="";
        switch(this.props.currentSport){
            case 'tennis':
                filteredEvents = this.props.events.filter(function (event) {
                    return event.event_name === tournament && event.event_type === type;
                });
                return filteredEvents;
            
            default:
                filteredEvents = this.props.events.filter(function (event) {
                    return event.league === tournament && event.country === type;
                });
                return filteredEvents;

        }
        

    } 


    render() {    
        const tournamentDivItems=this.props.tournaments.map(item => <div><div className="tournament_div"><p className="tournament_name">{item.event_name} &nbsp; &nbsp; {item.event_type}</p></div><Events tournamentName={item.event_name} events={this.getEvents(item.event_name,item.event_type)}/></div>);
        return <div>{tournamentDivItems}</div>;
    }
    
}
