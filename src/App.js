import React, { Component } from 'react';
import logo from './logo.svg';
import MyComponent from './TypeScriptComponent'
import './App.css';
// import * as proto from '../protos/labels_pb.d.ts'
import * as protoService from '../protos/labels_pb_service.ts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MyComponent name={"Bready"} />
      </div>
    );
  }
}

export default App;
