/* eslint-disable */
import React, { Component } from 'react'

const tabStyle = {
    float:"left",
    cursor: "pointer"
}
const activeRowStyle = {
    height: 4,
    backgroundColor: "#83a515",
    color: "green",
    borderWidth: 0,
    marginBottom: 0
}
const dormantRowStyle = {
    height: 0,
    borderWidth: 0,
    marginBottom: 0
}
const dormantTitleStyle = {
    paddingLeft: 16,
    paddingRight: 16,
    color: "#556789",
    fontSize: 18,
    fontWeight: "Normal",
    marginBottom: 12
}
const activeTitleStyle = {
    paddingLeft: 16,
    paddingRight: 16,
    color: "#83a515",
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 12
}

class TopbarTab extends Component {
    constructor(props) {
        super()

        this.state = {
            activeTab:props.activeTab,
            text:props.text,
            clickHandler:props.clickHandler,
            index:props.index
        }
    }
    componentDidUpdate(nextProps) {
        if (this.state.activeTab != this.props.activeTab)
        {
        this.setState({activeTab: this.props.activeTab})
        }
    }

    render() {
        return(
            <div style={tabStyle} onClick={() => this.state.clickHandler(this.state.index)}>
                <p style={(this.state.activeTab == this.state.index) ? activeTitleStyle : dormantTitleStyle}>{this.props.text}</p>
                <hr style={(this.state.activeTab == this.state.index) ? activeRowStyle : dormantRowStyle}></hr>
            </div>
        )
    }
}
export default TopbarTab