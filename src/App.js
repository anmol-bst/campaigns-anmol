import React from 'react'
import './App.css';
import Header from './components/Header';
import CampaignList from './components/CampaignList';
import LocalizedStrings from "react-localization";
import locales from "./locales";

function App() {
  const [lang, setLang] = React.useState("en");
  let translations = new LocalizedStrings(locales);

  const languageHandler = (e) => {
    let lang = e.target.value;
    setLang(lang)
  }
  const dropdownStyle = {
    position: "absolute",
    top: 28,
    right:16,
    width: 72,
    height: 24,
    backgroundColor: "white",
    color: "#181B34",
    border: "2px solid #181B34",
    fontWeight: 500,
    fontSize: 12,
  }
  translations.setLanguage(lang);
  return (
    <div className="App">
      <Header/>
      <CampaignList locales={translations}/>
      <select onChange={languageHandler} style={dropdownStyle}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
    </div>
  );
}

export default App;
