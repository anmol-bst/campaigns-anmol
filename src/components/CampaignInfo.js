/* eslint-disable */
import React, { Component } from 'react'
import Price from './Price.svg'
import Csv from './file.svg'
import Report from './statisticsReport.svg'
import Calendar from './calendar.svg'

const heading2Style = {
    fontSize: 16,
    color: "#2B416C",
    textAlign: "left",
    margin: 0,
    padding: "28px 20px 4px 20px"
}
const heading3Style = {
    fontSize: 14,
    color: "#7788A3",
    fontStyle: "Italic",
    textAlign: "left",
    margin: 0,
    padding: "0px 20px 18px 20px"
}
const borderStyle = {
    borderBottom: "1pt solid #ECECEC"
}
const floatLeft = {
    float: 'left'
}
const imgStyle = {
    height: 40,
    width: 40,
    float: "left",
    padding: "26px 0px 24px 20px"
}
const imgLabelStyle = {
    height: 24,
    width: 24,
    float: "left"
}
const infoLabelStyle = {
    float: "left",
    cursor: "pointer",
    verticalAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8
}
const labelStyle = {
    fontSize: 14,
    fontWeight: 400,
    color: "#7788A3",
    textAlign: "left",
    margin: 0,
    marginLeft: 6,
    marginTop: 4
}
const hiddenStyle = {
    display: "none"
}
class CampaignInfo extends Component {
    constructor(props) {
        super()
        let d = new Date(props.createdOn)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let dNow = new Date()
        let diffTime = dNow - d;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        this.state = {
            name:props.name,
            createdOn: `${mo} ${ye}, ${da}`,
            region:props.region,
            price:props.price,
            csv:props.csv,
            report:props.report,
            image_url:props.image_url,
            id:props.id,
            diffDays:diffDays,
            displayFunc:props.displayFunc,
            activeTab: props.activeTab,
            visible: ((diffDays < 0) & props.activeTab == 0) | ((diffDays == 0) & props.activeTab == 1) | ((diffDays > 0) & props.activeTab == 2)
        }
    }
    componentDidUpdate(nextProps) {
        console.log("compwill"+ this.state.activeTab + this.props.activeTab + this.state.id)
        let isVisible = ((this.state.diffDays < 0) & this.props.activeTab == 0) | ((this.state.diffDays == 0) & this.props.activeTab == 1) | ((this.state.diffDays > 0) & this.props.activeTab == 2)
        if (this.state.activeTab != this.props.activeTab)
        {
        this.setState({activeTab: this.props.activeTab}, this.setState({visible:isVisible}, () => {console.log("postvisible" + this.state.activeTab + this.state.visible)}))
        }
    }

    render() {
        return(
            <tr key={this.state.id} style={this.state.visible ? borderStyle : hiddenStyle}>
                <td>
                    <p style={heading2Style}>{this.state.createdOn}</p>
                    <p style={heading3Style}>{(this.state.diffDays == 0) ? "Live" : (Math.abs(this.state.diffDays).toString() + ((this.state.diffDays > 0) ? " days ago" : " days to go"))}</p>
                </td>
                <td>
                    <img src={this.state.image_url} style={imgStyle}/>
                    <div style={floatLeft}>
                        <p style={heading2Style}>{this.state.name}</p>
                        <p style={heading3Style}>{this.state.region}</p>
                    </div>
                </td>
                <td>
                    <div  style={infoLabelStyle} onClick={() => this.state.displayFunc(this.state.price.monthly,this.state.price.half_yearly,this.state.price.yearly, this.state.image_url, this.state.name, this.state.region)}>
                        <img src={Price} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>View Pricing</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div style={infoLabelStyle}>
                        <img src={Csv} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>CSV</p>
                        </div>
                    </div>
                    <div style={infoLabelStyle}>
                        <img src={Report} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>Report</p>
                        </div>
                    </div>
                    <div style={infoLabelStyle}>
                        <img src={Calendar} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>Schedule again</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}
export default CampaignInfo