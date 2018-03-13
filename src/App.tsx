import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from 'redux';

import { generalActions } from './actions';
import { ApiState, RootState } from './redux';


let logo = require('./logo.svg')
import "./App.css";

interface State {}
export interface Props extends React.Props {
  readonly fetching: boolean;
  readonly dog: string|null;
  readonly error: string|null;
  onRequestDog: () => void;
}

class App extends React.Component<Props, State> = (props) => {
  const { fetching, dog, error, onRequestDog } = props;
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

const mapStateToProps = (state: ApiState) => ({
  fetching: state.fetching,
  dog: state.dog,
  error: state.error
});
const mapDispatchToProps = (dispatch: Dispatch<ApiState>) => bindActionCreators({
  onRequestDog: () => dispatch(generalActions.request()),
}, dispatch);

export const App = connect(mapStateToProps, mapDispatchToProps)(App);
