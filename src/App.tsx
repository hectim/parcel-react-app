import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';

import { generalActions } from './actions';
import { ApiState, RootState } from './redux';


let logo = require('./logo.svg')
import "./App.css";


interface StateFromProps {
  fetching: boolean;
  dog: string;
  error: string;
}

interface DispatchFromProps {
  onRequestDog: () => void;
}

class App extends React.Component {
  render() {
    const { fetching, dog, error, onRequestDog } = this.props;
    const img_src = logo;
    if (dog != "") {
      const img_src = dog;
      console.log('in here', typeof dog)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={dog || logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dog Saga</h1>
        </header>

        {dog ? (
          <p className="App-intro">Keep clicking for new dogs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a dog!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestDog}>Request a Dog</button>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
      </div>
    );
  }
}

const mapStateToProps = (state: ApiState) => ({
  fetching: state.fetching,
  dog: state.dog,
  error: state.error
});

const mapDispatchToProps = (dispatch: Dispatch<ApiState>) => bindActionCreators({
  onRequestDog: () => dispatch(generalActions.request()),
}, dispatch);

export default connect<StateFromProps, DispatchFromProps, { label: string }>(mapStateToProps, mapDispatchToProps)(App);

