
import React, { Component, useState } from 'react'
import TopbarTab from './TopbarTab'
import CampaignInfo from './CampaignInfo'
import config from '../config'
import Plus from '../assets/plus.svg'
import Fallback from '../assets/Fallback.png'
import { getDatabase, ref, onValue, update} from "firebase/database";
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
const inputModalContentStyle = {
    backgroundColor: "#fefefe",
    margin: "auto",
    border: "1px solid #888",
    width: "60%",
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
const heading21Style = {
    fontSize: 16,
    color: "#2B416C",
    textAlign: "left",
    margin: 0,
    fontWeight: 500,
    padding: "8px 20px 8px 0px",
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
    cursor: "pointer",
    marginLeft: 20
}
const plusImgStyle = {
    width: 24,
    height: 24,
    float: "right",
    marginRight: 8,
    marginTop: 24,
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
            inputDisplay:false,
            image_url: "",
            displayName: "",
            displayRegion: "",
            campaigns: {"data":[]},
            iName: "New campaign",
            iDate: (new Date()).toISOString().substr(0,10),
            iRegion: "IN",
            iReport: "",
            iCsv: "",
            iImageUrl: "",
            iPrice1: 0,
            iPrice2: 0,
            iPrice3: 0
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
    hideModal = () => this.setState({display:false, inputDisplay:false})
    
    displayModal = (price1, price2, price3, image_url, displayName, displayRegion) => {
        this.setState({price1:price1,price2:price2,price3:price3,image_url:image_url,displayName:displayName,displayRegion:displayRegion,display:true})
    }
    setIName = (e) => this.setState({iName:e.target.value})
    setIDate = (e) => this.setState({iDate:e.target.value})
    setICsv = (e) => this.setState({iCsv:e.target.value})
    setIReport = (e) => this.setState({iReport:e.target.value})
    setIImageUrl = (e) => this.setState({iImageUrl:e.target.value})
    setIRegion = (e) => this.setState({iRegion:e.target.value})
    setIPrice1 = (e) => this.setState({iPrice1:e.target.value})
    setIPrice2 = (e) => this.setState({iPrice2:e.target.value})
    setIPrice3 = (e) => this.setState({iPrice3:e.target.value})
    addCampaign = () => {
        console.log(this.state.iName)
        console.log((new Date(this.state.iDate)).getTime())
        console.log(this.state.iRegion)
        console.log(this.state.iReport)
        console.log(this.state.iCsv)
        console.log(this.state.iImageUrl)
        console.log(this.state.iPrice1)
        console.log(this.state.iPrice2)
        console.log(this.state.iPrice3)
        this.hideModal()
        const db = getDatabase();

        const priceData = {
            monthly: parseInt(this.state.iPrice1),
            half_yearly: parseInt(this.state.iPrice2),
            yearly: parseInt(this.state.iPrice3)
        }

        // A post entry.
        const postData = {
            name: this.state.iName,
            createdOn: (new Date(this.state.iDate)).getTime(),
            region: this.state.iRegion,
            price: priceData,
            report: this.state.iReport,
            csv: this.state.iCsv,
            image_url: this.state.iImageUrl
        };

        // Get a key for a new Post.
        const newPostKey = this.state.campaigns.data.length;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/data/' + newPostKey] = postData;
        
        this.setState({iName:"New Campaign", iDate:(new Date()).toISOString().substr(0,10),iRegion:"IN",iReport:"",iCsv:"",iImageUrl:"",iPrice1:0,iPrice2:0,iPrice3:0})
        return update(ref(db), updates);
    }

    render() {
        return(
            <div>
                <div style={shifted10}>
                    <p style={fontXL}>{this.props.locales.manageCampaigns}</p>
                    <TopbarTab text= {this.props.locales.upcomingCampaigns} activeTab= {this.state.activeTab} index={0} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= {this.props.locales.liveCampaigns} activeTab= {this.state.activeTab} index={1} clickHandler={this.setActiveTab}/>
                    <TopbarTab text= {this.props.locales.pastCampaigns} activeTab= {this.state.activeTab} index={2} clickHandler={this.setActiveTab}/>
                    <img src={Plus} style={plusImgStyle} onClick={()=>{this.setState({inputDisplay:true})}}/>
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
                            <img src={this.state.image_url} style={imgStyle} onError={() => {this.setState({image_url:Fallback})}}/>
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
                <div style={this.state.inputDisplay? modalStyle : modelHiddenstyle}>
                    <div style={inputModalContentStyle}>
                        <p style={heading1Style}>New campaign</p>
                        <table style={modalTableStyle}>
                            <tbody>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.campaign}</td>
                                    <td style={modalTableValueStyle}><input type="text" value={this.state.iName} onInput={this.setIName}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.date}</td>
                                    <td style={modalTableValueStyle}><input type="date" value={this.state.iDate} onInput={this.setIDate}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>Region</td>
                                    <td style={modalTableValueStyle}><input type="text" value={this.state.iRegion} onInput={this.setIRegion}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>Image URL</td>
                                    <td style={modalTableValueStyle}><input type="text" value={this.state.iImageUrl} onInput={this.setIImageUrl}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.csv}</td>
                                    <td style={modalTableValueStyle}><input type="text" value={this.state.iCsv} onInput={this.setICsv}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.report}</td>
                                    <td style={modalTableValueStyle}><input type="text" value={this.state.iReport} onInput={this.setIReport}></input></td>
                                </tr>
                                <p style={heading21Style}>{this.props.locales.pricing}</p>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.weekMonth}</td>
                                    <td style={modalTableValueStyle}><input type="number" value={this.state.iPrice1} onInput={this.setIPrice1}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.halfYear}</td>
                                    <td style={modalTableValueStyle}><input type="number" value={this.state.iPrice2} onInput={this.setIPrice2}></input></td>
                                </tr>
                                <tr>
                                    <td style={modalTableLabelStyle}>{this.props.locales.year}</td>
                                    <td style={modalTableValueStyle}><input type="number" value={this.state.iPrice3} onInput={this.setIPrice3}></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button style={closeButtonStyle} onClick={() => this.addCampaign()}>Add</button>
                        <button style={closeButtonStyle} onClick={() => this.hideModal()}>Close</button>
                    </div>

                </div>
            </div>
            )
    }
}
export default CampaignList