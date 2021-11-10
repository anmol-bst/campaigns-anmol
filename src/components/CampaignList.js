
import React, { Component } from 'react'
import TopbarTab from './TopbarTab'
import Campaigns from './SampleData.json'
import CampaignInfo from './CampaignInfo'

const shifted10 = {
    marginLeft: "12.5%",
    width: "75%"
}
const shadowStyle = {
    marginLeft: "12.5%",
    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    width: "75%",
    marginTop: 40,
    borderWidth: 0,
    borderCollapse: "collapse",
    color: "#556789",
    fontSize: 16,
    fontStyle: "Medium"
}
const thStyle = {
    backgroundColor: "#F1F1F4",
    textAlign: "left",
    padding: "12px 20px"
}
const fontXL = {
    fontSize: 48,
    fontWeight: "Bold",
    color: "#2B416C",
    textAlign: "left",
    marginTop: 40,
    marginBottom: 20
}
const rowStyle = {
    height: 1,
    backgroundColor: "#F1F1F4",
    color: "#F1F1F4",
    borderWidth: 0,
    width: "100%",
    marginTop: 0
}
const modalStyle = {
    display: "block",
    position: "fixed",
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.7)"
}
const imgStyle = {
    height: 138,
    width: 138,
    float: "left",
    boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.15)",
}
const modalContentStyle = {
    backgroundColor: "#fefefe",
    margin: "auto",
    marginTop: "4.5%",
    border: "1px solid #888",
    width: "25%",
    padding: "12px 20px 20px 20px"
}
const modelHiddenstyle = {
    display: "none"
}
const displayBlockstyle = {
    display: "block",
    height: 138,
    display: "flex"
}
const heading2Style = {
    fontSize: 16,
    color: "#2B416C",
    textAlign: "left",
    margin: 0,
    fontWeight: 500,
    padding: "28px 20px 14px 10px",
    alignSelf: "flex-end"
}
const heading3Style = {
    fontSize: 14,
    color: "#7788A3",
    textAlign: "left",
    margin: 0,
    padding: "0px 20px 0px 10px"
}
const heading1Style = {
    fontSize: 24,
    color: "#2B416C",
    fontWeight: "bold",
    textAlign: "left",
    margin: 0,
    padding: "28px 20px 16px 0px"
}
const flexEndStyle = {
    float: "left",
    alignSelf: "flex-end"
}
const modalTableStyle = {
    width: "100%",
    borderWidth: 0,
    borderCollapse: "collapse",
    fontSize: 16
}
const modalTableLabelStyle = {
    textAlign: "left",
    color: "#7788A3",
    padding: "5px 20px 20px 0px"
}
const modalTableValueStyle = {
    textAlign: "right",
    color: "#556789",
    padding: "5px 0px 20px 20px",
    fontWeight: "bold"
}
const closeButtonStyle = {
    marginTop: 36,
    width: 84,
    height: 48,
    backgroundColor: "white",
    color: "#181B34",
    border: "2px solid #181B34",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer"
}
class CampaignList extends Component {
    constructor(props) {
        super()

        this.state = {
            activeTab:0,
            price1:0,
            price2:0,
            price3:0,
            display: false,
            image_url: "",
            displayName: "",
            displayRegion: ""
        }
        
        this.setActiveTab = this.setActiveTab.bind(this)
        this.displayModal = this.displayModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("compwill"+ this.state.activeTab)
        this.setState({activeTab: nextProps.activeTab}, () => {console.log(this.state.activeTab)})
    }
    setActiveTab = (tab) => this.setState({activeTab:tab})
    hideModal = () => this.setState({display:false})
    
    displayModal = (price1, price2, price3, image_url, displayName, displayRegion) => {
        this.setState({price1:price1,price2:price2,price3:price3,image_url:image_url,displayName:displayName,displayRegion:displayRegion,display:true})
    }

    render() {
        return(
            <div>
                <div style={shifted10}>
                    <p style={fontXL}>Manage Campaigns</p>
                    <TopbarTab text= "Upcoming Campaigns" activeTab= {this.state.activeTab} index={0} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= "Live Campaigns" activeTab= {this.state.activeTab} index={1} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= "Past Campaigns" activeTab= {this.state.activeTab} index={2} clickHandler={this.setActiveTab}/>
                    <hr style={rowStyle}/>
                </div>
                <table style={shadowStyle}>
                    <tbody>
                        <tr>
                            <th style={thStyle}>DATE</th>
                            <th style={thStyle}>CAMPAIGN</th>
                            <th style={thStyle}>VIEW</th>
                            <th style={thStyle}>ACTIONS</th>
                        </tr>
                        {Campaigns.data.map((item, i) => (
                            <CampaignInfo name={item.name} createdOn={item.createdOn} price={item.price} region={item.region} activeTab={this.state.activeTab}
                                        csv={item.csv} report={item.report} image_url={item.image_url} id={i} displayFunc={this.displayModal}/>
                        ))}
                    </tbody>
                </table>
                <div id="myModal" style={this.state.display? modalStyle : modelHiddenstyle}>

                    <div style={modalContentStyle}>
                        <div style={displayBlockstyle}>
                            <img src={this.state.image_url} style={imgStyle}/>
                            <div style={flexEndStyle}>
                            <p style={heading2Style}>{this.state.displayName}</p>
                            <p style={heading3Style}>{this.state.displayRegion}</p>
                            </div>
                        </div>
                        <p style={heading1Style}>Pricing</p>
                        <table style={modalTableStyle}>
                            <tbody>
                                <tr>
                                    <td style={modalTableLabelStyle}>1 Week - 1 Month</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price1.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>6 Months</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price2.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>1 Year</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price3.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button style={closeButtonStyle} onClick={this.hideModal}>Close</button>
                    </div>

                </div>
            </div>
            )
    }
}
export default CampaignList