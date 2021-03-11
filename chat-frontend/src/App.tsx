import './App.css';
import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import ChatPageComponent from './Components/ChatPageComponent/ChatPageComponent';

const App = () =>(
  <>
    <HeaderComponent></HeaderComponent>
    <div className="App">
      <ChatPageComponent></ChatPageComponent>
    </div>
  </>
);

export default App;
