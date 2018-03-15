import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';
import * as _ from 'lodash';

import { generalActions } from './actions';
import { ApiState, RootState } from './redux';


let logo = require('./logo.svg')
import "./App.css";


interface PropsFromState {
  fetching: boolean;
  dog: string;
  error: string;
}

interface PropsFromDispatch {
  onRequestDog: () => void;
  // another example:
  // onRequestDog: (value:string) => void;
}

interface PropsFromComponent {
  parentPropsExample: string
}

interface ComponentLocalState {
  readonly localStateExample: string,
  readonly test: string,
}


interface ReduxProps extends PropsFromState, PropsFromDispatch { }
interface Props extends ReduxProps, PropsFromComponent {}


class App extends React.Component<ReduxProps, PropsFromComponent | ComponentLocalState> {
  state: ComponentLocalState;
  constructor(props: Props) {
    super(props);

    this.state = {
      localStateExample: "money",
      test: "yo",
    };

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps() {
    console.log('checkout the props:', this.props)
  }

  handleClick(e: React.FormEvent<HTMLButtonElement>): void {
    if (this.state.localStateExample == 'money') {
    this.setState({localStateExample: 'fame'});
    }
    else {
      this.setState({localStateExample: 'money'});
    }
  }

  render() {
    const { fetching, dog, error, onRequestDog } = this.props;
    const img_src = logo;
    if (dog != "") {
      const img_src = dog;
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
       
        <button onClick={this.handleClick}>Click me to simulate an event</button>
      </div>
    );
  }
}


function mapStateToProps(state: ApiState, ownProps: PropsFromComponent): PropsFromState {
  console.log('ownProps: ', ownProps)
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  }
};

function mapDispatchToProps(dispatch: Dispatch<ApiState>): PropsFromDispatch {
  return bindActionCreators({
  onRequestDog: () => dispatch(generalActions.request()),
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, PropsFromComponent>(mapStateToProps, mapDispatchToProps)(App);

