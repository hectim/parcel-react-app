import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators  } from 'redux';
import * as _ from 'lodash';

import { GraphActions } from './actions';
import { RootState } from '../rootState';


// TODO move the logo
let logo = require('../logo.svg')


interface PropsFromState {
  fetching: boolean;
  imgSrc: string;
  error: string;
}

interface PropsFromDispatch {
  onRequestGraph: () => void;
  cancelRequestGraph: () => void;
  // another example:
  // onRequestGraph: (value:string) => void;
}

interface PropsFromComponent {
  parentPropsExample: string
}

interface ReduxProps extends PropsFromState, PropsFromDispatch {}
interface Props extends ReduxProps, PropsFromComponent {}


interface ComponentLocalState {
  readonly localStateExample: string,
}

class Graph extends React.Component<ReduxProps, PropsFromComponent | ComponentLocalState> {
  state: ComponentLocalState;
  constructor(props: Props) {
    super(props);

    this.state = {
      localStateExample: "money",
    };

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps() {
    console.log('checkout the props:', this.props)
  }

  handleClick(e: React.FormEvent<HTMLButtonElement>): void {
    this.state.localStateExample == 'money' ? 
      this.setState({localStateExample: 'fame'}) :
      this.setState({localStateExample: 'money'});
  }

  render() {
    const { fetching, imgSrc, error, onRequestGraph, cancelRequestGraph } = this.props;
    console.log('imgSrc: ', imgSrc);
    return (
      <div className="App">
        <header className="App-header">
          <img src={imgSrc || logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Graph Saga</h1>
        </header>

        {imgSrc ? (
          <p className="App-intro">Keep clicking for new graphs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a graph!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestGraph}>Request a graph</button>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
       
        <button onClick={cancelRequestGraph}>Cancel API call</button>
        <br />
        <button onClick={this.handleClick}>Click me to simulate an event</button>
      </div>
    );
  }
}


function mapStateToProps(state: RootState, ownProps: PropsFromComponent): PropsFromState {
  console.log('state: ', state)
  return {
    fetching: state.graph.fetching,
    imgSrc: state.graph.imgSrc,
    error: state.graph.error
  }
};

function mapDispatchToProps(dispatch: Dispatch<RootState>): PropsFromDispatch {
  return bindActionCreators({
  onRequestGraph: () => dispatch(GraphActions.request()),
  cancelRequestGraph: () => dispatch(GraphActions.cancel()),
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, PropsFromComponent>(mapStateToProps, mapDispatchToProps)(Graph);

