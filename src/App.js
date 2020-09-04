import React from "react";
import { BrowserRouter as Router,Switch, Route,Link} from 'react-router-dom';

import Tournaments from './components/Tournaments';


export default class RouteApp extends React.Component{


  constructor(props){
    super(props);
    this.state={currentSport:'soccer',events:[],tournaments:[]};
    this.fetchContent('soccer');
  }

  updateContent = (sport) => {
    this.setState({currentSport:sport},this.fetchContent(sport))
  }

  fetchContent = (sport) =>{
    const url = `http://www.localhost:8000/${sport}/`;
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
        switch(this.state.currentSport){
          case 'tennis':
            uniqueCombination=this.state.events[index].event_type+this.state.events[index].event_name;
            break;
          
          default:
            uniqueCombination=this.state.events[index].country+this.state.events[index].league;
            break;
        }
        
        if (!flags[uniqueCombination]) {
            flags[uniqueCombination] = true;
            switch(this.state.currentSport){
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
  
  render() {
    let sports=['soccer','tennis','basketball','cricket','baseball','hockey'];
    const linkDivs=sports.map(item => <li class="icon_item"><Link to={`/${item}`}> <div className="icon_div"><button className={this.state.currentSport===item ? 'btn sport_icon selected':'btn sport_icon' } onClick={this.updateContent.bind(this,item)}><img src={`./images/${item}.svg`} alt={item} style={{width:'50px',height:'40px'}}/></button></div></Link></li> );
    const RouteDivs=sports.map(item =>  <Route path={`/${item}`}><div><Tournaments currentSport={this.state.currentSport} tournaments={this.state.tournaments} events={this.state.events}/></div></Route>)
    return (
    <Router>
      <div>
        <nav>
          <ul className="icon_list">
            {linkDivs}
          </ul>
        </nav>

        <Switch>         
          {RouteDivs}
        </Switch>
      </div>
    </Router>
    )
  }


};

