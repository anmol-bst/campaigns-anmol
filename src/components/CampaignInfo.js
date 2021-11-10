/* eslint-disable */
import React, { Component } from 'react'
import Price from '../assets/Price.svg'
import Csv from '../assets/file.svg'
import Report from '../assets/statisticsReport.svg'
import Calendar from '../assets/calendar.svg'
import DatePicker from "react-date-picker"
import { getDatabase, ref, update, push, child, key} from "firebase/database";
import '../assets/CustomDatePicker.css'

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
    float: "left",
    marginRight: 6
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
    marginTop: 4
}
const hiddenStyle = {
    display: "none"
}
const infoDateLabelStyle = {
    float: "left",
    cursor: "pointer",
    verticalAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8
}
const ExampleCustomInput = React.forwardRef(({ value, onClick, text }, ref) => (
    <div style={infoDateLabelStyle} onClick={onClick} ref={ref}>
    <img src={Calendar} style={imgLabelStyle}/>
    <div style={floatLeft}>
        <p style={labelStyle}>{text}</p>
    </div>
    </div>
  ));
class CampaignInfo extends Component {
    constructor(props) {
        super()
        let d = new Date(props.createdOn)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let dNow = new Date()
        let diffTime = dNow - d;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 

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
    dateChange = (value) => {
        let d = new Date(value)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let dNow = new Date()
        let diffTime = dNow - d;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
        let isVisible = ((diffDays < 0) & this.props.activeTab == 0) | ((diffDays == 0) & this.props.activeTab == 1) | ((diffDays > 0) & this.props.activeTab == 2)
        this.setState({createdOn: `${mo} ${ye}, ${da}`});
        this.setState({diffDays:diffDays})
        this.setState({visible:isVisible})
    }
    dateUpdate = (value) => {
        this.dateChange(value)
        const db = getDatabase();

        // A post entry.
        const postData = {
            name: this.state.name,
            createdOn: (new Date(value)).getTime(),
            region: this.state.region,
            price: this.state.price,
            report: this.state.report,
            csv: this.state.csv,
            image_url: this.state.image_url
        };

        // Get a key for a new Post.
        const newPostKey = this.state.id;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/data/' + newPostKey] = postData;

        return update(ref(db), updates);
    }
    componentDidUpdate(nextProps) {
        let isVisible = ((this.state.diffDays < 0) & this.props.activeTab == 0) | ((this.state.diffDays == 0) & this.props.activeTab == 1) | ((this.state.diffDays > 0) & this.props.activeTab == 2)
        if (this.state.activeTab != this.props.activeTab)
        {
        this.setState({activeTab: this.props.activeTab}, this.setState({visible:isVisible}))
        }
        if (this.state.name != this.props.name)
        {
        this.setState({name: this.props.name})
        }
        if (this.state.region != this.props.region)
        {
        this.setState({region: this.props.region})
        }
        if (this.state.price != this.props.price)
        {
        this.setState({price: this.props.price})
        }
        if (this.state.csv != this.props.csv)
        {
        this.setState({csv: this.props.csv})
        }
        if (this.state.report != this.props.report)
        {
        this.setState({report: this.props.report})
        }
        if (this.state.image_url != this.props.image_url)
        {
        this.setState({image_url: this.props.image_url})
        }
        let d = new Date(this.props.createdOn)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        if (this.state.createdOn != `${mo} ${ye}, ${da}`)
        {
        this.dateChange(this.props.createdOn)
        }
    }

    render() {
        return(
            <tr key={this.state.id} style={this.state.visible ? borderStyle : hiddenStyle}>
                <td>
                    <p style={heading2Style}>{this.state.createdOn}</p>
                    <p style={heading3Style}>{(this.state.diffDays == 0) ? this.props.locales.live : (Math.abs(this.state.diffDays).toString() + ((Math.abs(this.state.diffDays) > 1) ? this.props.locales.days : this.props.locales.day) + ((this.state.diffDays > 0) ? this.props.locales.ago : this.props.locales.toGo))}</p>
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
                            <p style={labelStyle}>{this.props.locales.viewPricing}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div style={infoLabelStyle}>
                        <img src={Csv} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>{this.props.locales.csv}</p>
                        </div>
                    </div>
                    <div style={infoLabelStyle}>
                        <img src={Report} style={imgLabelStyle}/>
                        <div style={floatLeft}>
                            <p style={labelStyle}>{this.props.locales.report}</p>
                        </div>
                    </div>
                        <DatePicker value={new Date()} returnValue="start" calendarIcon={<ExampleCustomInput text={this.props.locales.schedule}/>} onChange={this.dateUpdate}/>
                </td>
            </tr>
        )
    }
}
export default CampaignInfo