
import React, { Component } from 'react'
import TopbarTab from './TopbarTab'
import CampaignInfo from './CampaignInfo'
import config from '../config'
import { getDatabase, ref, onValue} from "firebase/database";
import { initializeApp } from '@firebase/app';

const shifted10 = {
    marginLeft: "12.5%",
    width: "75%"
}
const overflowStyle = {
    marginLeft: "12.5%",
    marginTop: 40,
    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    width: "75%"
}
const shadowStyle = {
    width: "100%",
    borderWidth: 0,
    borderCollapse: "collapse",
    color: "#556789",
    fontSize: 16,
    fontStyle: "Medium"
}
const thStyle = {
    backgroundColor: "#F1F1F4",
    textAlign: "left",
    padding: "12px 20px",
    textTransform: "uppercase"
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
    height: "33%",
    width: "33%",
    float: "left",
    boxShadow: "0 2px 15px 0 rgba(0, 0, 0, 0.15)",
}
const modalContentStyle = {
    backgroundColor: "#fefefe",
    marginLeft: "auto",
    marginRight: "auto",
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
    height: "33%",
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
    padding: "5px 2px 20px 0px"
}
const modalTableValueStyle = {
    textAlign: "right",
    color: "#556789",
    padding: "5px 0px 20px 2px",
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
            displayRegion: "",
            campaigns: {"data":[]}
        }
        var fire = initializeApp(config)
        const db = getDatabase();
        const starCountRef = ref(db, '/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.setState({campaigns:data})
        });

        this.setActiveTab = this.setActiveTab.bind(this)
        this.displayModal = this.displayModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
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
                    <p style={fontXL}>{this.props.locales.manageCampaigns}</p>
                    <TopbarTab text= {this.props.locales.upcomingCampaigns} activeTab= {this.state.activeTab} index={0} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= {this.props.locales.liveCampaigns} activeTab= {this.state.activeTab} index={1} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= {this.props.locales.pastCampaigns} activeTab= {this.state.activeTab} index={2} clickHandler={this.setActiveTab}/>
                    <hr style={rowStyle}/>
                </div>
                <div style={overflowStyle}>
                <table style={shadowStyle}>
                    <tbody>
                        <tr>
                            <th style={thStyle}>{this.props.locales.date}</th>
                            <th style={thStyle}>{this.props.locales.campaign}</th>
                            <th style={thStyle}>{this.props.locales.view}</th>
                            <th style={thStyle}>{this.props.locales.actions}</th>
                        </tr>
                        {this.state.campaigns.data.map((item, i) => (
                            <CampaignInfo name={item.name} createdOn={item.createdOn} price={item.price} region={item.region} activeTab={this.state.activeTab}
                                        csv={item.csv} report={item.report} image_url={item.image_url} id={i} displayFunc={this.displayModal} locales={this.props.locales}/>
                        ))}
                    </tbody>
                </table>
                </div>
                <div id="myModal" style={this.state.display? modalStyle : modelHiddenstyle}>

                    <div style={modalContentStyle}>
                        <div style={displayBlockstyle}>
                            <img src={this.state.image_url} style={imgStyle}/>
                            <div style={flexEndStyle}>
                            <p style={heading2Style}>{this.state.displayName}</p>
                            <p style={heading3Style}>{this.state.displayRegion}</p>
                            </div>
                        </div>
                        <p style={heading1Style}>{this.props.locales.pricing}</p>
                        <table style={modalTableStyle}>
                            <tbody>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.weekMonth}</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price1.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.halfYear}</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price2.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.year}</td>
                                    <td style={modalTableValueStyle}>$ {this.state.price3.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button style={closeButtonStyle} onClick={this.hideModal}>{this.props.locales.close}</button>
                    </div>

                </div>
            </div>
            )
    }
}
export default CampaignList