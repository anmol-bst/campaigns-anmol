
import React, { Component } from 'react'
import logo from '../assets/TitleHead.png'

const headerStyle = {
    backgroundColor: "#1F2640",
    height: 44,
    padding: 18,
    width: "100%"
}
const imgStyle = {
    width: 148,
    height: 44,
    position: "absolute",
    left: "12.5%"
}

const Header = () => {
    return(
        <div style={headerStyle}>
            <img src={logo} alt="logo" style={imgStyle}/>
        </div>
        )
}
export default Header