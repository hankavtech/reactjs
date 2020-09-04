import React, { Component } from 'react'

import * as moment from 'moment'
import * as timezone from 'moment-timezone'

export default class Events extends Component {
  render(props) {
    const events=this.props.events;
  const eventItems=events.map(eventItem => <tr className="event_div"><td className="time">{moment(eventItem.match_time).tz('America/Los_Angeles').format('hh : mm')} &nbsp; &nbsp;</td><td><p className="event">{eventItem.participant1} &nbsp; <b>vs</b> &nbsp; {eventItem.participant2}</p></td></tr>);
    return (
      <div>
        {eventItems}
      </div>
    )
  }
}
