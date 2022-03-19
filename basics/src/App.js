import React from 'react';
import Game from './components/Game';
import './App.css';

/*
// Class Based Component
class App extends React.Component{
  render(){
    return(
      <div>Hello</div>
    );
  }
}


// Function based Component
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

class App extends React.Component{
  render(){
    return(
      <Game/>
    );
  }
}
export default App;
