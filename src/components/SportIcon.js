import React from 'react'

export default class SportIcon extends React.Component {
    
    render() {
        return (
            <div className="icon_div">
                <button className={this.props.activeSport===this.props.sport ? 'btn sport_icon selected':'btn sport_icon' } onClick={this.props.changeSport}><img src={`./images/${this.props.sport}.svg`} alt={this.props.sport} style={{width:'50px',height:'40px'}}/></button>
            </div>
        )
    }
}
