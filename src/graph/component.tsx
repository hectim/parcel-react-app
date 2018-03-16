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
  fetching1: boolean;
  imgSrc1: string;
  error1: string;
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


class Graph extends React.Component<ReduxProps, PropsFromComponent> {
  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps() {
    console.log('checkout the props:', this.props)
  }

  render() {
    const { fetching1, imgSrc1, error1, onRequestGraph, cancelRequestGraph } = this.props;
    console.log('imgSrc1: ', imgSrc1);
    return (
      <div className="App">
        <header className="App-header">
          <img src={imgSrc1 || logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Graph Saga</h1>
        </header>

        {imgSrc1 ? (
          <p className="App-intro">Keep clicking for new graphs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a graph!</p>
        )}

        {fetching1 ? (
          <button disabled>fetching1...</button>
        ) : (
          <button onClick={onRequestGraph}>Request a graph</button>
        )}

        {error1 && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
       
        <button onClick={cancelRequestGraph}>Cancel API call</button>
        <br />
      </div>
    );
  }
}


function mapStateToProps(state: RootState, ownProps: PropsFromComponent): PropsFromState {
  console.log('state: ', state)
  return {
    fetching1: state.graph.fetching1,
    imgSrc1: state.graph.imgSrc1,
    error1: state.graph.error1
  }
};

function mapDispatchToProps(dispatch: Dispatch<RootState>): PropsFromDispatch {
  return bindActionCreators({
  onRequestGraph: () => dispatch(GraphActions.request()),
  cancelRequestGraph: () => dispatch(GraphActions.cancel()),
  }, dispatch);
}

export default connect<PropsFromState, PropsFromDispatch, PropsFromComponent>(mapStateToProps, mapDispatchToProps)(Graph);

