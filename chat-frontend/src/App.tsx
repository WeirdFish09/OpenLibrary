import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatComponent from './Components/ChatComponent/ChatComponent';
import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import ChatPageComponent from './Components/ChatPageComponent/ChatPageComponent';

function App() {
  return (<>
    <HeaderComponent></HeaderComponent>
    <div className="App">
       <ChatPageComponent></ChatPageComponent>
    </div>
    </>);
}

export default App;
