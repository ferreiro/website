import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount = () => {
    console.log('fetching...')
      // This code should call: http://localhost:3000/api/status
      // and return {"response":"Everything is working correctly"}
      fetch('/api/status')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.log(error));
  }

  render = () => {
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
}

export default App;
